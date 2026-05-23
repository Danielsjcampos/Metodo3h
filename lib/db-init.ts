import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function initDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined in environment variables.");
    return;
  }

  const sql = neon(databaseUrl);

  try {
    console.log("Checking and initializing Neon PostgreSQL database tables...");

    // 1. Create Users Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'member')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create Leads Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        whatsapp VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Courses Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL
      )
    `);

    // 4. Create Modules Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS modules (
        id VARCHAR(50) PRIMARY KEY,
        course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
        title VARCHAR(100) NOT NULL,
        sort_order INTEGER DEFAULT 0
      )
    `);

    // 5. Create Lessons Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id VARCHAR(50) PRIMARY KEY,
        module_id VARCHAR(50) REFERENCES modules(id) ON DELETE CASCADE,
        title VARCHAR(100) NOT NULL,
        duration VARCHAR(20) NOT NULL,
        video_url VARCHAR(255) NOT NULL,
        sort_order INTEGER DEFAULT 0
      )
    `);

    // 6. Create News Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS news (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        important BOOLEAN DEFAULT FALSE,
        date VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create Highlights Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS highlights (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        link VARCHAR(255) NOT NULL,
        badge VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 8. Create Site Settings Table
    await sql.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(50) PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    console.log("Database tables checked/created successfully.");

    // 9. Seeding site settings if empty
    const settingsCount = await sql.query(`SELECT COUNT(*) FROM site_settings`);
    const sCount = parseInt((settingsCount[0] as any).count, 10);
    if (sCount === 0) {
      console.log("Seeding starting database settings...");
      const defaultSettings = [
        ["logo_text", "METODO3HORAS"],
        ["seo_title", "Método 3h - Seu site profissional com IA em 3 horas"],
        ["seo_description", "Aprenda a colocar seu site no ar hoje sem precisar programar e sem pagar por hospedagem cara com o Método 3h."],
        ["seo_favicon", "/images/faviicon metodo3h.png"],
        ["geo_city", "São José dos Campos"],
        ["geo_state", "SP"],
        ["social_instagram", "https://instagram.com/danielmarques.dino"],
        ["social_youtube", "https://youtube.com/c/danielmarques"],
        ["whatsapp_enabled", "false"],
        ["whatsapp_number", "5512999999999"],
        ["whatsapp_message", "Olá! Gostaria de saber mais sobre o Método 3h."],
        ["launch_price", "97"],
        ["regular_price", "247"]
      ];
      for (const [key, value] of defaultSettings) {
        await sql.query(`INSERT INTO site_settings (key, value) VALUES ($1, $2)`, [key, value]);
      }
    }

    // 8. Seeding starting data if users is empty
    const usersCount = await sql.query(`SELECT COUNT(*) FROM users`);
    const count = parseInt((usersCount[0] as any).count, 10);

    if (count === 0) {
      console.log("Seeding starting database data...");

      // Seed Users
      const adminHash = hashPassword("admin123");
      const memberHash = hashPassword("aluno123");

      await sql.query(
        `INSERT INTO users (id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)`,
        ["u1", "Daniel Marques", "admin@metodo3horas.com.br", adminHash, "admin"]
      );

      await sql.query(
        `INSERT INTO users (id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)`,
        ["u2", "João Silva", "aluno@metodo3horas.com.br", memberHash, "member"]
      );

      // Seed Leads
      const leadsSeed = [
        ["l1", "Carlos Eduardo", "carlos.edu@example.com", "11988887777", "pending"],
        ["l2", "Mariana Costa", "mariana.c@example.com", "21977776666", "contacted"],
        ["l3", "Felipe Andrade", "felipe.andrade@example.com", "31966665555", "converted"],
        ["l4", "Ana Julia Souza", "anajulia@example.com", "19955554444", "pending"]
      ];

      for (const lead of leadsSeed) {
        await sql.query(
          `INSERT INTO leads (id, name, email, whatsapp, status) VALUES ($1, $2, $3, $4, $5)`,
          lead
        );
      }

      // Seed Course
      await sql.query(
        `INSERT INTO courses (id, title, description) VALUES ($1, $2, $3)`,
        [
          "c1", 
          "Método 3h Masterclass", 
          "Aprenda a colocar seu site ou o de seus clientes no ar em tempo recorde utilizando Inteligência Artificial e ferramentas profissionais sem pagar por hospedagem cara."
        ]
      );

      // Seed Modules
      const modulesSeed = [
        ["m1", "c1", "Módulo 1: Fundações e Setup", 1],
        ["m2", "c1", "Módulo 2: Criando Interfaces de Alto Impacto", 2],
        ["m3", "c1", "Módulo 3: Deploy e Hospedagem R$0", 3]
      ];

      for (const mod of modulesSeed) {
        await sql.query(
          `INSERT INTO modules (id, course_id, title, sort_order) VALUES ($1, $2, $3, $4)`,
          mod
        );
      }

      // Seed Lessons
      const lessonsSeed = [
        ["le1", "m1", "1.1 Introdução ao Método 3h", "12:45", "https://www.w3schools.com/html/mov_bbb.mp4", 1],
        ["le2", "m1", "1.2 Configurando as ferramentas gratuitas", "18:20", "https://www.w3schools.com/html/movie.mp4", 2],
        ["le3", "m1", "1.3 Entendendo o poder do Low-Code + IA", "15:10", "https://www.w3schools.com/html/mov_bbb.mp4", 3],
        
        ["le4", "m2", "2.1 Estrutura e Copywriting que vendem", "22:15", "https://www.w3schools.com/html/movie.mp4", 1],
        ["le5", "m2", "2.2 Estilizando como um profissional com Tailwind", "28:40", "https://www.w3schools.com/html/mov_bbb.mp4", 2],
        ["le6", "m2", "2.3 Elementos dinâmicos e micro-animações", "19:55", "https://www.w3schools.com/html/movie.mp4", 3],
        
        ["le7", "m3", "3.1 Preparando para o Deploy", "14:30", "https://www.w3schools.com/html/mov_bbb.mp4", 1],
        ["le8", "m3", "3.2 Conectando ao Vercel e Netlify", "21:10", "https://www.w3schools.com/html/movie.mp4", 2],
        ["le9", "m3", "3.3 Domínios personalizados e SSL Grátis", "17:05", "https://www.w3schools.com/html/mov_bbb.mp4", 3]
      ];

      for (const les of lessonsSeed) {
        await sql.query(
          `INSERT INTO lessons (id, module_id, title, duration, video_url, sort_order) VALUES ($1, $2, $3, $4, $5, $6)`,
          les
        );
      }

      // Seed News
      const newsSeed = [
        [
          "n1", 
          "🔥 Lançamento Oficial da Turma 1!", 
          "Sejam bem-vindos ao Método 3h! O portal oficial está 100% funcional. Preparem-se para as aulas dinâmicas e o suporte individual na nossa comunidade secreta. Nossa primeira live de mentoria será nesta quinta-feira às 20:00!", 
          "Geral", 
          true, 
          new Date().toLocaleDateString("pt-BR")
        ],
        [
          "n2", 
          "💡 Dica da Semana: Como conseguir clientes rapidamente", 
          "Criamos um template de proposta comercial no Canva e adicionamos na seção de materiais adicionais de destaque. Use esse script simples para fechar projetos de R$1.500 a R$3.000 em menos de 7 dias.", 
          "Dicas", 
          false, 
          new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleDateString("pt-BR")
        ]
      ];

      for (const item of newsSeed) {
        await sql.query(
          `INSERT INTO news (id, title, content, category, important, date) VALUES ($1, $2, $3, $4, $5, $6)`,
          item
        );
      }

      // Seed Highlights
      const highlightsSeed = [
        ["h1", "Template Premium Tailwind", "Baixe o template oficial completo pronto para uso e acelere a criação dos seus projetos.", "https://github.com", "Recurso", "Templates"],
        ["h2", "Comunidade Secreta no Discord", "Acesse nosso grupo exclusivo de alunos e troque experiências e feche parcerias comerciais.", "https://discord.com", "Comunidade", "Links Úteis"],
        ["h3", "Guia de Prompts IA para Copys", "PDF contendo todos os prompts exatos do ChatGPT para gerar copy de alta conversão.", "https://google.com", "PDF", "E-Books"]
      ];

      for (const hl of highlightsSeed) {
        await sql.query(
          `INSERT INTO highlights (id, title, description, link, badge, category) VALUES ($1, $2, $3, $4, $5, $6)`,
          hl
        );
      }

      console.log("Database seeded successfully!");
    } else {
      console.log("Database already seeded with users. Skipping seeding.");
    }
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
    throw error;
  }
}
