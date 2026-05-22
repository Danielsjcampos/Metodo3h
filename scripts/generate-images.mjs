import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/tools");

// Rode com: OPENAI_API_KEY=sk-... node scripts/generate-images.mjs
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BASE_STYLE =
  "ultra premium dark tech illustration, deep dark navy background nearly black, subtle electric blue glowing light accents, photorealistic render quality, cinematic lighting, no text, no labels, no UI elements, minimalist composition, 8K quality";

const images = [
  {
    file: "antigravity.png",
    prompt: `Abstract AI website creation concept: a glowing neural network morphing into a sleek modern website layout, beams of blue light converging into a structured grid, particles forming a digital page, ${BASE_STYLE}`,
  },
  {
    file: "vercel.png",
    prompt: `Abstract deployment pipeline concept: a dark tunnel of converging light streams forming a perfect triangle shape at the end, electric blue speed lines rushing forward, sense of instant deployment and velocity, ${BASE_STYLE}`,
  },
  {
    file: "cloudflare.png",
    prompt: `Abstract cybersecurity and CDN concept: a glowing shield made of interconnected blue light nodes and network lines, floating in deep dark space, digital protection force field radiating outward, ${BASE_STYLE}`,
  },
  {
    file: "registro.png",
    prompt: `Abstract domain ownership concept: a glowing blue URL address bar floating in dark space, light particles forming a .com.br domain name, digital ownership and identity visualization, clean geometric lines, ${BASE_STYLE}`,
  },
  {
    file: "search-console.png",
    prompt: `Abstract SEO analytics concept: glowing blue bar chart bars rising dramatically from left to right, data visualization rising upward like skyscrapers, search ranking position graph climbing, ${BASE_STYLE}`,
  },
  {
    file: "google-business.png",
    prompt: `Abstract local business discovery concept: a glowing blue location pin floating above a dark abstract map grid with light node connections, radiating discovery pulses, ${BASE_STYLE}`,
  },
  {
    file: "problem-price.png",
    prompt: `Abstract concept of excessive cost and overpricing: dark stormy background with a single harsh red spotlight illuminating a massive price tag with absurd numbers, oppressive weight of financial burden, contrast of dark blue shadows and stark light, ${BASE_STYLE}`,
  },
  {
    file: "problem-time.png",
    prompt: `Abstract concept of wasted waiting time: a dark hourglass with glowing blue sand frozen mid-fall, time suspended, calendar pages dissolving into particles, sense of stagnation and lost opportunity, ${BASE_STYLE}`,
  },
  {
    file: "problem-lock.png",
    prompt: `Abstract concept of digital dependency and being locked in: a glowing blue padlock at the center of converging chains made of light, trapped in a dark digital prison, ${BASE_STYLE}`,
  },
];

async function generate(item) {
  console.log(`⏳ Gerando: ${item.file}...`);
  try {
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: item.prompt,
      n: 1,
      size: "1536x1024",
      quality: "high",
    });
    const b64 = response.data[0].b64_json;
    const dest = path.join(OUT_DIR, item.file);
    fs.writeFileSync(dest, Buffer.from(b64, "base64"));
    console.log(`✅ Salvo: ${item.file}`);
  } catch (err) {
    console.error(`❌ Erro em ${item.file}:`, err.message);
  }
}

// Run sequentially to avoid rate limits
for (const item of images) {
  await generate(item);
}

console.log("\n🎉 Todas as imagens geradas em public/images/tools/");
