const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');
require('dotenv').config(); // Opsional: Untuk menyimpan API Key di file .env

const app = express();
const port = 3000;

// --- KONFIGURASI PENTING ---
// Mengizinkan website frontend Anda mengakses server ini
app.use(cors()); 
app.use(express.json());

// Masukkan API Token Replicate Anda di sini
const replicate = new Replicate({
  const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
});

// Endpoint untuk Generate Video
app.post('/generate-video', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt tidak boleh kosong." });
  }

  console.log(`[SYSTEM]: Menerima perintah visual: "${prompt}"`);

  try {
    // Memulai proses AI (Menggunakan model Luma Ray V2 sebagai contoh)
    const output = await replicate.run(
      "luma/ray-v2", 
      { 
        input: { 
          prompt: prompt,
          aspect_ratio: "16:9" 
        } 
      }
    );

    console.log("[SYSTEM]: Neural render berhasil. URL:", output);
    
    // Mengirim URL video balik ke Frontend
    res.json({ video_url: output });

  } catch (error) {
    console.error("[ERROR]: Gagal memproses Neural Sequence:", error.message);
    res.status(500).json({ 
        error: "Gagal terhubung ke Neural Core.",
        details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`
  -----------------------------------------
   AKASHIRO NEURAL SERVER : ONLINE
   LISTENING ON PORT      : ${port}
   STATUS                 : SECURE_CONNECTION
  -----------------------------------------
  `);
});
