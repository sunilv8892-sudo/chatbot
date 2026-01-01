export default function handler(req, res) {
  const message = (req.body?.message || "").toLowerCase().trim();

  // 🔴 TEMP DEBUG — PROVES FILE IS RUNNING
  if (message === "__test__") {
    return res.json({ reply: "CHAT.JS IS RUNNING" });
  }

  // ✅ CONTACT — MUST COME FIRST
  if (
    message.includes("contact") ||
    message.includes("phone") ||
    message.includes("call") ||
    message.includes("email") ||
    message.includes("mail") ||
    message.includes("address")
  ) {
    return res.json({
      reply:
        "📞 Phone: 0821 233 1722\n" +
        "📧 Email: chandrajithmmca@mitmysore.in\n" +
        "📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008\n" +
        "🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM"
    });
  }

  // 🟡 FALLBACK — MUST BE LAST
  return res.json({
    reply:
      "I’m here to help 🙂 You can ask about admissions, courses, faculty, or contact details."
  });
}
