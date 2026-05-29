const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

/**
 * Fallback dummy todos in case Gemini fails, times out, or returns invalid JSON.
 */
const getFallbackTodos = (burnout, mental, input) => {
  const todos = [];
  
  if (input.sleep_hours < 6) {
    todos.push({
      title: "Perbaiki Jam Tidur",
      description: "Usahakan tidur minimal 7 jam malam ini untuk pemulihan fisik.",
      priority: "high"
    });
  }
  
  if (input.stress >= 7) {
    todos.push({
      title: "Istirahat Mental 15 Menit",
      description: "Lakukan relaksasi atau meditasi singkat untuk menurunkan tingkat stres.",
      priority: "high"
    });
  }

  if (input.activity_hours < 2) {
    todos.push({
      title: "Olahraga Ringan",
      description: "Lakukan aktivitas fisik ringan selama 15-30 menit hari ini.",
      priority: "medium"
    });
  }

  // Ensure at least 3 todos are generated
  if (todos.length < 3) {
    todos.push({
      title: "Minum Air Putih",
      description: "Pastikan tubuh tetap terhidrasi dengan baik.",
      priority: "medium"
    });
    if (todos.length < 3) {
      todos.push({
        title: "Pertahankan Kebiasaan Baik",
        description: "Lanjutkan pola hidup sehat yang sudah Anda jalankan.",
        priority: "low"
      });
    }
  }

  return todos.slice(0, 3);
};

/**
 * Sanitize and parse Gemini JSON response.
 */
const parseGeminiResponse = (text) => {
  try {
    // Strip markdown formatting if Gemini wrapped it in ```json ... ```
    let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Attempt to parse
    const parsed = JSON.parse(cleanText);
    
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title) {
      return parsed;
    }
    throw new Error("Invalid JSON structure from Gemini");
  } catch (error) {
    console.error("❌ Failed to parse Gemini response:", error.message);
    return null;
  }
};

/**
 * Main service function to generate personalized todos.
 */
const generatePersonalizedTodos = async (burnoutPrediction, mentalHealthPrediction, assessmentInput) => {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ GEMINI_API_KEY is missing. Using fallback todos.");
      return getFallbackTodos(burnoutPrediction, mentalHealthPrediction, assessmentInput);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Anda adalah seorang "Burnout Recovery Assistant" yang ramah, berempati, dan sangat memahami kehidupan mahasiswa di Indonesia.
Tugas Anda adalah merancang rekomendasi To-Do List harian untuk membantu mahasiswa menurunkan tingkat burnout mereka.

Konteks Mahasiswa:
- Tingkat Burnout AI: ${burnoutPrediction}
- Kondisi Mental AI: ${mentalHealthPrediction}
- Data Asesmen: ${JSON.stringify(assessmentInput)}

ATURAN WAJIB UNTUK RESPONSE (STRICT RULES):
1. Realistis untuk Mahasiswa: Saran harus bisa dilakukan anak kos atau mahasiswa biasa (jangan menyuruh liburan mahal atau terapi medis). Hindari saran medis/klinis sama sekali.
2. Actionable & Praktis: Langkah kecil yang bisa langsung dilakukan hari ini (contoh: "Tidur 30 menit lebih awal", "Minum segelas air sekarang", "Jeda sosmed 1 jam").
3. Bahasa Natural: Gunakan bahasa Indonesia kasual yang memotivasi, hangat, tidak kaku, dan tidak terkesan robotik.
4. Fokus Menurunkan Burnout: Prioritaskan masalah utama dari data asesmen (misal: jika stres tinggi, beri tugas relaksasi. Jika tidur kurang, beri tugas tidur).
5. Jumlah Tugas: Buatkan tepat 3 hingga maksimal 5 tugas (To-Do).
6. FORMAT WAJIB: Kembalikan HANYA format JSON Array valid. DILARANG menambahkan teks pembuka/penutup seperti "Ini hasilnya:" atau penanda markdown \`\`\`json.

Skema JSON yang diminta:
[
  {
    "title": "Judul Todo (Singkat, jelas, max 5 kata)",
    "description": "Kalimat penyemangat & deskripsi singkat (Bahasa natural, max 15 kata)",
    "priority": "high" | "medium" | "low"
  }
]
`;

    // Timeout protection (20 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API Timeout")), 20000)
    );

    // Call Gemini with Promise.race for timeout
    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]);

    const responseText = result.response.text();
    
    // Validation and Sanitization
    const todos = parseGeminiResponse(responseText);
    
    if (todos) {
      console.log(`✅ Sukses generate ${todos.length} Gemini To-Dos`);
      return todos;
    } else {
      console.log("⚠️ Fallback ke Dummy Todos karena parse gagal");
      return getFallbackTodos(burnoutPrediction, mentalHealthPrediction, assessmentInput);
    }

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    console.log("⚠️ Fallback ke Dummy Todos karena API error");
    // Graceful fallback on API error/timeout
    return getFallbackTodos(burnoutPrediction, mentalHealthPrediction, assessmentInput);
  }
};

module.exports = {
  generatePersonalizedTodos
};
