import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/tools");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BASE_STYLE =
  "ultra premium dark tech illustration, deep dark navy background nearly black, subtle electric blue glowing light accents, photorealistic render quality, cinematic lighting, no text, no labels, no UI elements, minimalist composition, 8K quality";

const images = [
  {
    file: "metric-speed.png",
    prompt: `Abstract concept of extreme speed and time compression: a dark tunnel with blue light trails accelerating toward a single vanishing point, clock hands blurring into light streaks, sense of 3 hours becoming instant, motion blur of digital velocity, ${BASE_STYLE}`,
  },
  {
    file: "metric-free.png",
    prompt: `Abstract concept of zero cost and freedom from financial chains: a broken chain dissolving into blue light particles floating upward, dark background with a single glowing zero symbol made of pure light, liberation and no constraints, ${BASE_STYLE}`,
  },
  {
    file: "metric-independence.png",
    prompt: `Abstract concept of total independence and self-sufficiency: a single glowing human silhouette standing alone at the top of a dark mountain peak, surrounded by electric blue aurora light, commanding and empowered, ${BASE_STYLE}`,
  },
  {
    file: "metric-earnings.png",
    prompt: `Abstract concept of first earnings and professional value: a dark background with rising blue light columns forming a dramatic upward graph, gold and blue glowing coins or value tokens ascending in a spiral, wealth and growth visualization, ${BASE_STYLE}`,
  },
];

async function generate(item) {
  console.log(`⏳ Gerando: ${item.file}...`);
  try {
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: item.prompt,
      n: 1,
      size: "1024x1024",
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

for (const item of images) {
  await generate(item);
}

console.log("\n🎉 Imagens de métricas geradas!");
