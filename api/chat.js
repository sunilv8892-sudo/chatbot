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

  /* =========================
     HELPER
  ========================= */
  function hasAny(words) {
    return words.some(w => q.includes(w));
  }

  /* =========================
     KNOWLEDGE BASE
  ========================= */
  const KB = [
    {
      keywords: ["contact", "phone", "email", "address"],
      reply:
        "📞 Phone: 0821 233 1722\n" +
        "📧 Email: chandrajithmmca@mitmysore.in\n" +
        "📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008\n" +
        "🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM"
    },
    {
      keywords: ["courses", "course", "program"],
      reply:
        "🎓 Courses offered at MIT First Grade College:\n\n" +
        "• BCA – Bachelor of Computer Applications\n" +
        "• BBA – Bachelor of Business Administration\n" +
        "• B.Com – Bachelor of Commerce"
    },
    {
      keywords: ["bca"],
      reply:
        "🎓 BCA is a 3-year undergraduate program focused on programming, software development, and computer applications."
    },
    {
      keywords: ["bba"],
      reply:
        "🎓 BBA focuses on management, leadership, entrepreneurship, and business administration."
    },
    {
      keywords: ["bcom", "b.com"],
      reply:
        "🎓 B.Com focuses on accounting, finance, taxation, and management."
    },
    {
      keywords: ["eligibility", "eligible"],
      reply:
        "✅ Eligibility:\n\n" +
        "• BCA: 10+2 with Maths / CS / Accountancy OR relevant diploma\n" +
        "• BBA & B.Com: 10+2 in any discipline"
    },
    {
      keywords: ["duration", "years", "semester"],
      reply:
        "⏳ All undergraduate programs are 3 years long, divided into 6 semesters."
    },
    {
      keywords: ["principal"],
      reply:
        "👨‍🏫 Principal: Dr. Chandrajit Mohan (MCA, KSET, Ph.D)\n" +
        "Experience: 18+ years in teaching, industry, and research."
    },
    {
      keywords: ["faculty", "teachers"],
      reply:
        "MIT First Grade College has experienced and qualified faculty across all departments."
    },
    {
      keywords: ["location", "where"],
      reply:
        "📍 MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka."
    }
  ];

  /* =========================
     MATCHING
  ========================= */
  for (const item of KB) {
    if (hasAny(item.keywords)) {
      return res.json({ reply: item.reply });
    }
  }

  /* =========================
     FALLBACK
  ========================= */
  return res.json({
    reply:
      "I can help with admissions, courses (BCA, BBA, B.Com), eligibility, faculty, location, and contact details. Please ask about one topic."
  });
}
