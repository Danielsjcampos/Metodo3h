import { neon } from "@neondatabase/serverless";
import crypto from "crypto";
import { initDatabase } from "./db-init";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "member";
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  status: "pending" | "contacted" | "converted";
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  important: boolean;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  link: string;
  badge: string;
  category: string;
}

export interface SiteSettings {
  logoText: string;
  seoTitle: string;
  seoDescription: string;
  seoFavicon: string;
  geoCity: string;
  geoState: string;
  socialInstagram: string;
  socialYoutube: string;
  whatsappEnabled: boolean;
  whatsappNumber: string;
  whatsappMessage: string;
  launchPrice: string;
  regularPrice: string;
}

export interface DatabaseSchema {
  users: User[];
  leads: Lead[];
  courses: Course[];
  news: NewsItem[];
  highlights: HighlightItem[];
}

let isDbInitialized = false;

async function ensureDbInitialized() {
  if (!isDbInitialized) {
    await initDatabase();
    isDbInitialized = true;
  }
}

const getSql = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }
  return neon(databaseUrl);
};

// Password hashing utility using native crypto
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Read database helper from Neon PostgreSQL
export async function readDb(): Promise<DatabaseSchema> {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined in environment variables. Returning default database schema.");
    return {
      users: [],
      leads: [],
      courses: [],
      news: [],
      highlights: [],
    };
  }

  await ensureDbInitialized();
  const sql = getSql();

  try {
    const [dbUsers, dbLeads, dbCourses, dbModules, dbLessons, dbNews, dbHighlights] = await Promise.all([
      sql.query(`SELECT * FROM users`),
      sql.query(`SELECT * FROM leads`),
      sql.query(`SELECT * FROM courses`),
      sql.query(`SELECT * FROM modules ORDER BY sort_order ASC`),
      sql.query(`SELECT * FROM lessons ORDER BY sort_order ASC`),
      sql.query(`SELECT * FROM news`),
      sql.query(`SELECT * FROM highlights`)
    ]);

    // Map Users
    const users: User[] = dbUsers.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      passwordHash: u.password_hash,
      role: u.role as "admin" | "member",
      createdAt: u.created_at ? new Date(u.created_at).toISOString() : new Date().toISOString(),
    }));

    // Map Leads
    const leads: Lead[] = dbLeads.map((l: any) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      whatsapp: l.whatsapp,
      status: l.status as "pending" | "contacted" | "converted",
      createdAt: l.created_at ? new Date(l.created_at).toISOString() : new Date().toISOString(),
    }));

    // Map Courses, Modules, Lessons
    const lessonsByModule: { [key: string]: Lesson[] } = {};
    dbLessons.forEach((l: any) => {
      if (!lessonsByModule[l.module_id]) {
        lessonsByModule[l.module_id] = [];
      }
      lessonsByModule[l.module_id].push({
        id: l.id,
        title: l.title,
        duration: l.duration,
        videoUrl: l.video_url,
      });
    });

    const modulesByCourse: { [key: string]: Module[] } = {};
    dbModules.forEach((m: any) => {
      if (!modulesByCourse[m.course_id]) {
        modulesByCourse[m.course_id] = [];
      }
      modulesByCourse[m.course_id].push({
        id: m.id,
        title: m.title,
        lessons: lessonsByModule[m.id] || [],
      });
    });

    const courses: Course[] = dbCourses.map((c: any) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      modules: modulesByCourse[c.id] || [],
    }));

    // Map News
    const news: NewsItem[] = dbNews.map((n: any) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      date: n.date,
      category: n.category,
      important: !!n.important,
    }));

    // Map Highlights
    const highlights: HighlightItem[] = dbHighlights.map((h: any) => ({
      id: h.id,
      title: h.title,
      description: h.description,
      link: h.link,
      badge: h.badge,
      category: h.category,
    }));

    return {
      users,
      leads,
      courses,
      news,
      highlights,
    };
  } catch (error) {
    console.error("Error reading database from Neon:", error);
    throw error;
  }
}

// Write database helper to Neon PostgreSQL (synchronizes memory changes back to Relational DB)
export async function writeDb(data: DatabaseSchema): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined in environment variables. Skipping writeDb.");
    return;
  }

  await ensureDbInitialized();
  const sql = getSql();

  try {
    // 1. Sync Users
    for (const u of data.users) {
      await sql.query(
        `INSERT INTO users (id, name, email, password_hash, role)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           email = EXCLUDED.email,
           password_hash = EXCLUDED.password_hash,
           role = EXCLUDED.role`,
        [u.id, u.name, u.email, u.passwordHash, u.role]
      );
    }
    const userIds = data.users.map((u) => u.id);
    if (userIds.length > 0) {
      const placeholders = userIds.map((_, i) => `$${i + 1}`).join(", ");
      await sql.query(`DELETE FROM users WHERE id NOT IN (${placeholders})`, userIds);
    } else {
      await sql.query(`DELETE FROM users`);
    }

    // 2. Sync Leads
    for (const l of data.leads) {
      await sql.query(
        `INSERT INTO leads (id, name, email, whatsapp, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           email = EXCLUDED.email,
           whatsapp = EXCLUDED.whatsapp,
           status = EXCLUDED.status,
           created_at = EXCLUDED.created_at`,
        [l.id, l.name, l.email, l.whatsapp, l.status, new Date(l.createdAt)]
      );
    }
    const leadIds = data.leads.map((l) => l.id);
    if (leadIds.length > 0) {
      const placeholders = leadIds.map((_, i) => `$${i + 1}`).join(", ");
      await sql.query(`DELETE FROM leads WHERE id NOT IN (${placeholders})`, leadIds);
    } else {
      await sql.query(`DELETE FROM leads`);
    }

    // 3. Sync Courses, Modules, and Lessons
    for (const c of data.courses) {
      await sql.query(
        `INSERT INTO courses (id, title, description)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description`,
        [c.id, c.title, c.description]
      );

      let moduleSortOrder = 1;
      for (const m of c.modules) {
        await sql.query(
          `INSERT INTO modules (id, course_id, title, sort_order)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (id) DO UPDATE SET
             course_id = EXCLUDED.course_id,
             title = EXCLUDED.title,
             sort_order = EXCLUDED.sort_order`,
          [m.id, c.id, m.title, moduleSortOrder++]
        );

        let lessonSortOrder = 1;
        for (const les of m.lessons) {
          await sql.query(
            `INSERT INTO lessons (id, module_id, title, duration, video_url, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (id) DO UPDATE SET
               module_id = EXCLUDED.module_id,
               title = EXCLUDED.title,
               duration = EXCLUDED.duration,
               video_url = EXCLUDED.video_url,
               sort_order = EXCLUDED.sort_order`,
            [les.id, m.id, les.title, les.duration, les.videoUrl, lessonSortOrder++]
          );
        }

        // Delete lessons in this module that are no longer in list
        const lessonIds = m.lessons.map((les) => les.id);
        if (lessonIds.length > 0) {
          const placeholders = lessonIds.map((_, i) => `$${i + 2}`).join(", ");
          await sql.query(
            `DELETE FROM lessons WHERE module_id = $1 AND id NOT IN (${placeholders})`,
            [m.id, ...lessonIds]
          );
        } else {
          await sql.query(`DELETE FROM lessons WHERE module_id = $1`, [m.id]);
        }
      }

      // Delete modules in this course that are no longer in list
      const moduleIds = c.modules.map((m) => m.id);
      if (moduleIds.length > 0) {
        const placeholders = moduleIds.map((_, i) => `$${i + 2}`).join(", ");
        await sql.query(
          `DELETE FROM modules WHERE course_id = $1 AND id NOT IN (${placeholders})`,
          [c.id, ...moduleIds]
        );
      } else {
        await sql.query(`DELETE FROM modules WHERE course_id = $1`, [c.id]);
      }
    }

    // Delete courses that are no longer in list
    const courseIds = data.courses.map((c) => c.id);
    if (courseIds.length > 0) {
      const placeholders = courseIds.map((_, i) => `$${i + 1}`).join(", ");
      await sql.query(`DELETE FROM courses WHERE id NOT IN (${placeholders})`, courseIds);
    } else {
      await sql.query(`DELETE FROM courses`);
    }

    // 4. Sync News
    for (const n of data.news) {
      await sql.query(
        `INSERT INTO news (id, title, content, category, important, date)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           content = EXCLUDED.content,
           category = EXCLUDED.category,
           important = EXCLUDED.important,
           date = EXCLUDED.date`,
        [n.id, n.title, n.content, n.category, n.important, n.date]
      );
    }
    const newsIds = data.news.map((n) => n.id);
    if (newsIds.length > 0) {
      const placeholders = newsIds.map((_, i) => `$${i + 1}`).join(", ");
      await sql.query(`DELETE FROM news WHERE id NOT IN (${placeholders})`, newsIds);
    } else {
      await sql.query(`DELETE FROM news`);
    }

    // 5. Sync Highlights
    for (const h of data.highlights) {
      await sql.query(
        `INSERT INTO highlights (id, title, description, link, badge, category)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           link = EXCLUDED.link,
           badge = EXCLUDED.badge,
           category = EXCLUDED.category`,
        [h.id, h.title, h.description, h.link, h.badge, h.category]
      );
    }
    const highlightIds = data.highlights.map((h) => h.id);
    if (highlightIds.length > 0) {
      const placeholders = highlightIds.map((_, i) => `$${i + 1}`).join(", ");
      await sql.query(`DELETE FROM highlights WHERE id NOT IN (${placeholders})`, highlightIds);
    } else {
      await sql.query(`DELETE FROM highlights`);
    }
  } catch (error) {
    console.error("Error writing database to Neon:", error);
    throw error;
  }
}

// Get Settings from database
export async function getSettings(): Promise<SiteSettings> {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined in environment variables. Returning default settings.");
    return {
      logoText: "METODO3HORAS",
      seoTitle: "Método 3h - Seu site profissional com IA em 3 horas",
      seoDescription: "Aprenda a colocar seu site no ar hoje sem precisar programar e sem pagar por hospedagem cara com o Método 3h.",
      seoFavicon: "/favicon.ico",
      geoCity: "São José dos Campos",
      geoState: "SP",
      socialInstagram: "https://instagram.com/danielmarques.dino",
      socialYoutube: "https://youtube.com/c/danielmarques",
      whatsappEnabled: false,
      whatsappNumber: "5512999999999",
      whatsappMessage: "Olá! Gostaria de saber mais sobre o Método 3h.",
    };
  }

  try {
    await ensureDbInitialized();
    const sql = getSql();
    const rows = await sql.query(`SELECT * FROM site_settings`);
    const settingsMap: { [key: string]: string } = {};
    rows.forEach((row: any) => {
      settingsMap[row.key] = row.value;
    });

    return {
      logoText: settingsMap["logo_text"] || "SITECOMIA",
      seoTitle: settingsMap["seo_title"] || "Método 3h - Seu site profissional com IA em 3 horas",
      seoDescription: settingsMap["seo_description"] || "Aprenda a colocar seu site no ar hoje sem precisar programar e sem pagar por hospedagem cara.",
      seoFavicon: settingsMap["seo_favicon"] || "/favicon.ico",
      geoCity: settingsMap["geo_city"] || "São José dos Campos",
      geoState: settingsMap["geo_state"] || "SP",
      socialInstagram: settingsMap["social_instagram"] || "https://instagram.com/danielmarques.dino",
      socialYoutube: settingsMap["social_youtube"] || "https://youtube.com/c/danielmarques",
      whatsappEnabled: settingsMap["whatsapp_enabled"] === "true",
      whatsappNumber: settingsMap["whatsapp_number"] || "5512999999999",
      whatsappMessage: settingsMap["whatsapp_message"] || "Olá! Gostaria de saber mais sobre o Método 3h.",
      launchPrice: settingsMap["launch_price"] || "97",
      regularPrice: settingsMap["regular_price"] || "247",
    };
  } catch (error) {
    console.error("Error getting settings from Neon:", error);
    return {
      logoText: "METODO3HORAS",
      seoTitle: "Método 3h - Seu site profissional com IA em 3 horas",
      seoDescription: "Aprenda a colocar seu site no ar hoje sem precisar programar e sem pagar por hospedagem cara com o Método 3h.",
      seoFavicon: "/favicon.ico",
      geoCity: "São José dos Campos",
      geoState: "SP",
      socialInstagram: "https://instagram.com/danielmarques.dino",
      socialYoutube: "https://youtube.com/c/danielmarques",
      whatsappEnabled: false,
      whatsappNumber: "5512999999999",
      whatsappMessage: "Olá! Gostaria de saber mais sobre o Método 3h.",
      launchPrice: "97",
      regularPrice: "247",
    };
  }
}

// Save Settings to database
export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined in environment variables. Skipping saveSettings.");
    return;
  }

  await ensureDbInitialized();
  const sql = getSql();

  try {
    const settingsList = [
      ["logo_text", settings.logoText],
      ["seo_title", settings.seoTitle],
      ["seo_description", settings.seoDescription],
      ["seo_favicon", settings.seoFavicon],
      ["geo_city", settings.geoCity],
      ["geo_state", settings.geoState],
      ["social_instagram", settings.socialInstagram],
      ["social_youtube", settings.socialYoutube],
      ["whatsapp_enabled", settings.whatsappEnabled ? "true" : "false"],
      ["whatsapp_number", settings.whatsappNumber],
      ["whatsapp_message", settings.whatsappMessage],
      ["launch_price", settings.launchPrice],
      ["regular_price", settings.regularPrice],
    ];

    for (const [key, value] of settingsList) {
      await sql.query(
        `INSERT INTO site_settings (key, value)
         VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
        [key, value]
      );
    }
  } catch (error) {
    console.error("Error saving settings to Neon:", error);
    throw error;
  }
}
