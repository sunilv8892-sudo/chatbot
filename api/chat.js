export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const raw = (req.body.message || "").toLowerCase().trim();
  if (!raw) {
    return res.json({ reply: "Please type your question." });
  }

  const q = raw.replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ");

  const has = (arr) => arr.some(w => q.includes(w));

  /* =========================
     LOCATION
  ========================= */
  if (has(["location", "where", "address", "place"])) {
    return res.json({
      reply: `
        <b>📍 MIT First Grade College</b><br><br>
        Mananthavadi Road, Vidyaranyapura,<br>
        Mysuru – 570008, Karnataka<br><br>
        <a href="https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru" target="_blank">
          📍 Open in Google Maps
        </a>
      `
    });
  }

  /* =========================
     CONTACT
  ========================= */
  if (has(["contact", "phone", "call", "email", "mail"])) {
    return res.json({
      reply: `
        <b>📞 Contact Details</b><br><br>
        Phone: <a href="tel:08212331722">0821 233 1722</a><br>
        Email: <a href="mailto:chandrajithmmca@mitmysore.in">chandrajithmmca@mitmysore.in</a><br><br>
        <a href="https://mitfgc.in" target="_blank">🌐 Visit Official Website</a>
      `
    });
  }

  /* =========================
     ADMISSIONS
  ========================= */
  if (has(["admission", "apply", "join", "joining", "enroll"])) {
    return res.json({
      reply: `
        <b>📝 Admissions – MIT First Grade College</b><br><br>
        Admissions are based on merit and University of Mysore guidelines.<br><br>

        👉 <a href="https://mitfgc.in/admission/" target="_blank">
        Click here for Admission Details</a>
      `
    });
  }

  /* =========================
     COURSES
  ========================= */
  if (has(["courses", "course", "program", "degree"])) {
    return res.json({
      reply: `
        <b>🎓 Courses Offered</b><br><br>
        • BCA – Bachelor of Computer Applications<br>
        • BBA – Bachelor of Business Administration<br>
        • B.Com – Bachelor of Commerce<br><br>

        👉 <a href="https://mitfgc.in/courses/" target="_blank">
        View Full Course Details</a>
      `
    });
  }

  /* =========================
     NOTES / STUDY MATERIAL
  ========================= */
  if (has(["notes", "nots", "pdf", "study material", "question paper"])) {
    return res.json({
      reply: `
        <b>📚 Study Materials</b><br><br>
        Notes and previous question papers are available here:<br><br>

        👉 <a href="https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD" target="_blank">
        Open Study Materials</a>
      `
    });
  }

  /* =========================
     DEFAULT
  ========================= */
  return res.json({
    reply: `
      👋 I can help you with:<br><br>
      • Admissions<br>
      • Courses<br>
      • Study Materials<br>
      • Location<br>
      • Contact Details<br><br>

      🌐 <a href="https://mitfgc.in" target="_blank">Visit Official Website</a>
    `
  });
}
