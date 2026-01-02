export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    // ✅ Safely parse body (Vercel-safe)
    let message = "";

    if (typeof req.body === "string") {
      message = req.body;
    } else if (typeof req.body === "object" && req.body !== null) {
      message = req.body.message || "";
    }

    const q = message.toLowerCase().trim();
    if (!q) {
      return res.json({ reply: "Please type your question." });
    }

    const hasAny = (arr) => arr.some((w) => q.includes(w));

    if (hasAny(["hi", "hello", "hey"])) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot. Ask me about admissions, courses, eligibility, or location."
      });
    }

    if (hasAny(["notes"])) {
      return res.json({
        reply:
          "📚 Study materials and notes are available at:\n" +
          "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
      });
    }

    if (hasAny(["course", "courses"])) {
      return res.json({
        reply:
          "🎓 Courses offered:\n• BCA\n• BBA\n• B.Com"
      });
    }

    return res.json({
      reply:
        "I can help with admissions, courses, eligibility, notes, location, and contact details."
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(200).json({
      reply: "Something went wrong internally, but the API is alive."
    });
  }
}
