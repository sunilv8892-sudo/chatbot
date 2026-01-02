export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const raw = (req.body?.message || "").toLowerCase().trim();
  if (!raw) {
    return res.json({ reply: "Please type your question." });
  }

  const q = raw
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const hasAny = (words) => words.some((w) => q.includes(w));

  /* =========================
     KNOWLEDGE BASE
  ========================= */

  if (hasAny(["hi", "hello", "hey"])) {
    return res.json({
      reply:
        "Hello 👋 I’m the MIT First Grade College chatbot. Ask me about admissions, courses, eligibility, or location."
    });
  }

  if (hasAny(["location", "address", "where"])) {
    return res.json({
      reply:
        "📍 MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka."
    });
  }

  if (hasAny(["contact", "phone", "email"])) {
    return res.json({
      reply:
        "📞 Phone: 0821 233 1722\n" +
        "📧 Email: chandrajithmmca@mitmysore.in\n" +
        "🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM"
    });
  }

  if (hasAny(["courses", "course", "program"]))) {
    return res.json({
      reply:
        "🎓 Courses offered at MIT First Grade College:\n\n" +
        "• BCA – Bachelor of Computer Applications\n" +
        "• BBA – Bachelor of Business Administration\n" +
        "• B.Com – Bachelor of Commerce"
    });
  }

  if (hasAny(["bca"])) {
    return res.json({
      reply:
        "🎓 BCA is a 3-year undergraduate program focused on programming, software development, and computer applications."
    });
  }

  if (hasAny(["bba"])) {
    return res.json({
      reply:
        "🎓 BBA focuses on management principles, leadership skills, and entrepreneurship."
    });
  }

  if (hasAny(["bcom", "b.com"])) {
    return res.json({
      reply:
        "🎓 B.Com focuses on accounting, finance, taxation, and management."
    });
  }

  if (hasAny(["eligibility", "eligible", "qualification"])) {
    return res.json({
      reply:
        "✅ Eligibility:\n\n" +
        "• BCA: 10+2 with Maths / Computer Science / Accountancy OR relevant diploma\n" +
        "• BBA & B.Com: 10+2 in any discipline"
    });
  }

  if (hasAny(["duration", "years", "semester"])) {
    return res.json({
      reply:
        "⏳ All undergraduate programs are 3 years long, divided into 6 semesters."
    });
  }

  if (hasAny(["notes", "study material", "pdf", "question paper"])) {
    return res.json({
      reply:
        "📚 Study materials and previous question papers are available through official college channels.\n\n" +
        "They are also available at:\n" +
        "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
    });
  }

  if (hasAny(["faculty", "teachers", "principal"])) {
    return res.json({
      reply:
        "👨‍🏫 Principal: Dr. Chandrajit Mohan (MCA, KSET, Ph.D)\n\n" +
        "MIT First Grade College has experienced and qualified faculty across all departments."
    });
  }

  /* =========================
     FALLBACK
  ========================= */

  return res.json({
    reply:
      "I can help with admissions, courses (BCA, BBA, B.Com), eligibility, faculty details, location, contact information, and study materials."
  });
}
