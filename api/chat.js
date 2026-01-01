// ... (keep all your existing imports/knowledge/helpers)

export default async function handler(req, res) {
  console.log("🔍 DEBUG - Message:", req.body?.message);
  console.log("🔍 GEMINI_KEY:", !!process.env.GEMINI_KEY ? "✅ LOADED" : "❌ MISSING");
  
  if (req.method !== "POST") return res.status(405).json({ reply: "Use POST" });
  
  const userMessage = (req.body?.message || "").trim();
  if (!userMessage) return res.status(400).json({ reply: "Type a question" });
  
  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) {
    console.log("❌ API KEY MISSING - Static fallback");
    return res.status(500).json({ reply: "Server config error. Contact admin." });
  }

  // ... rest of your exact code (intents, etc.)
}
