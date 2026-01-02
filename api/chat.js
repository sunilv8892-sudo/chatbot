export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  let msg = "";
  try {
    msg = (req.body?.message || "").toString().toLowerCase().trim();
  } catch (e) {}

  if (!msg) {
    return res.status(200).json({ reply: "Please enter a question." });
  }

  // Simple keyword replies
  if (msg.includes("hello") || msg.includes("hi")) {
    return res.status(200).json({ reply: "Hello 👋 How can I help you?" });
  }

  if (msg.includes("admission")) {
    return res.status(200).json({
      reply:
        "Admissions at MIT FGC are open! You can apply online or contact the office for details.",
    });
  }

  if (msg.includes("courses")) {
    return res.status(200).json({
      reply:
        "MIT FGC offers BCA, BBA and B.Com undergraduate programs.",
    });
  }

  if (msg.includes("location") || msg.includes("address")) {
    return res.status(200).json({
      reply:
        "MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka.",
    });
  }

  // Default fallback
  return res.status(200).json({
    reply:
      "Sorry, I didn't understand that. You can ask about admissions, courses, or location.",
  });
}
