export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const raw = (req.body.message || "").toLowerCase().trim();
  if (!raw) {
    return res.json({ reply: "Please type your question." });
  }

  // Normalize input heavily
  const q = raw
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  /* =====================================================
     COMMON HELPERS
  ===================================================== */

  function hasAny(words) {
    for (let w of words) {
      if (q.includes(w)) return true;
    }
    return false;
  }

  /* =====================================================
     LOCATION / ADDRESS (YOU COMPLAINED ABOUT THIS)
  ===================================================== */

  if (
    hasAny([
      "location", "located", "where", "place", "address",
      "college location", "where is college", "where is mit",
      "mit location", "fgc location"
    ])
  ) {
    return res.json({
      reply:
        "📍 MIT First Grade College is located at:\n" +
        "Mananthavadi Road, Vidyaranyapura,\n" +
        "Mysuru – 570008, Karnataka, India."
    });
  }

  /* =====================================================
     CONTACT / PHONE / EMAIL
  ===================================================== */

  if (
    hasAny([
      "contact", "phone", "call", "number", "mobile",
      "email", "mail", "gmail", "reach", "office number"
    ])
  ) {
    return res.json({
      reply:
        "📞 Phone: 0821 233 1722\n" +
        "📧 Email: chandrajithmmca@mitmysore.in\n" +
        "📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008\n" +
        "🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM"
    });
  }

  /* =====================================================
     ADMISSION (ALL POSSIBLE FORMS)
  ===================================================== */

  if (
    hasAny([
      "admission", "admit", "apply", "join", "joining",
      "i want admission", "want admission", "get admission",
      "how to join", "how can i join", "interested",
      "enroll", "enrol"
    ])
  ) {
    return res.json({
      reply:
        "📝 Admissions at MIT First Grade College are based on merit and University of Mysore guidelines.\n\n" +
        "Steps:\n" +
        "• Choose a course (BCA / BBA / B.Com)\n" +
        "• Check eligibility\n" +
        "• Visit the college office with required documents\n\n" +
        "Documents usually required:\n" +
        "• Marks cards\n" +
        "• Transfer Certificate\n" +
        "• ID proof\n" +
        "• Passport-size photographs"
    });
  }

  /* =====================================================
     COURSES OFFERED
  ===================================================== */

  if (
    hasAny([
      "courses", "course", "program", "programs",
      "degree", "degrees", "what courses",
      "what are the courses", "what programs"
    ])
  ) {
    return res.json({
      reply:
        "🎓 Courses offered at MIT First Grade College:\n\n" +
        "• BCA – Bachelor of Computer Applications\n" +
        "• BBA – Bachelor of Business Administration\n" +
        "• B.Com – Bachelor of Commerce\n\n" +
        "All courses are undergraduate programs."
    });
  }

  /* =====================================================
     BCA
  ===================================================== */

  if (hasAny(["bca", "computer application", "computer course", "it course"])) {
    return res.json({
      reply:
        "🎓 BCA (Bachelor of Computer Applications) is a 3-year undergraduate program.\n\n" +
        "It focuses on programming, software development, and computer applications.\n\n" +
        "Career options:\n" +
        "• IT & software jobs\n" +
        "• MCA\n" +
        "• M.Sc Computer Science"
    });
  }

  /* =====================================================
     BBA
  ===================================================== */

  if (hasAny(["bba", "business administration", "management course"])) {
    return res.json({
      reply:
        "🎓 BBA (Bachelor of Business Administration) is a 3-year undergraduate program.\n\n" +
        "It focuses on management, leadership, entrepreneurship, and business administration."
    });
  }

  /* =====================================================
     B.COM
  ===================================================== */

  if (hasAny(["bcom", "b com", "b.com", "commerce"])) {
    return res.json({
      reply:
        "🎓 B.Com (Bachelor of Commerce) is a 3-year undergraduate program.\n\n" +
        "It focuses on accounting, finance, taxation, and management.\n\n" +
        "Career options include banking, finance, CA, CS, MBA, and M.Com."
    });
  }

  /* =====================================================
     ELIGIBILITY
  ===================================================== */

  if (
    hasAny([
      "eligibility", "eligible", "qualification",
      "criteria", "who can apply", "requirements"
    ])
  ) {
    return res.json({
      reply:
        "✅ Eligibility Criteria:\n\n" +
        "• BCA: 10+2 with Maths / Computer Science / Accountancy OR relevant diploma\n" +
        "• BBA & B.Com: 10+2 in any discipline (as per University norms)"
    });
  }

  /* =====================================================
     DURATION
  ===================================================== */

  if (hasAny(["duration", "how long", "years", "semester"])) {
    return res.json({
      reply:
        "⏳ All undergraduate courses are 3 years in duration,\n" +
        "divided into 6 semesters (6 months each).\n\n" +
        "Maximum duration allowed is 6 years as per University of Mysore norms."
    });
  }

  /* =====================================================
     FACULTY / PRINCIPAL
  ===================================================== */

  if (
    hasAny([
      "faculty", "teachers", "staff",
      "principal", "head of college", "experience"
    ])
  ) {
    return res.json({
      reply:
        "👨‍🏫 The Principal of MIT First Grade College is Dr. Chandrajit Mohan (MCA, KSET, Ph.D).\n\n" +
        "Experience:\n" +
        "• 18+ years total\n" +
        "• 15 years teaching\n" +
        "• 3 years industry\n" +
        "• 12 years research\n\n" +
        "The college has experienced and qualified faculty across all departments."
    });
  }

  /* =====================================================
     DEPARTMENTS
  ===================================================== */

  if (hasAny(["department", "departments", "streams"])) {
    return res.json({
      reply:
        "🏫 Academic Departments:\n\n" +
        "• Computer Science (BCA)\n" +
        "• Commerce (B.Com)\n" +
        "• Management Studies (BBA)\n" +
        "• English\n" +
        "• Political Science\n" +
        "• Commerce & Taxation"
    });
  }

  /* =====================================================
     NOTES / NOTS / PDF / STUDY MATERIAL
  ===================================================== */

  if (
    hasAny([
      "notes", "nots", "note", "pdf",
      "study material", "question paper",
      "previous papers"
    ])
  ) {
    return res.json({
      reply:
        "📚 Study materials, notes, and previous question papers are provided through official college channels.\n\n" +
        "They are also available at:\n" +
        "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
    });
  }

  /* =====================================================
     GOOD COLLEGE / PARENT QUESTIONS
  ===================================================== */

  if (
    hasAny([
      "good college", "worth", "safe",
      "parent", "is it good", "should i join"
    ])
  ) {
    return res.json({
      reply:
        "MIT First Grade College provides a disciplined, safe, and student-friendly environment.\n\n" +
        "With experienced faculty, structured academic programs, and a strong academic focus,\n" +
        "it is a good choice for students and parents."
    });
  }

  /* =====================================================
     FEES (SAFE ANSWER)
  ===================================================== */

  if (hasAny(["fees", "fee structure", "cost"])) {
    return res.json({
      reply:
        "💰 Fee structure varies based on the course and university norms.\n\n" +
        "For accurate and updated fee details, students are advised to contact the college office directly."
    });
  }

  /* =====================================================
     FINAL FALLBACK
  ===================================================== */

  return res.json({
    reply:
      "I can help you with admissions, courses (BCA, BBA, B.Com), eligibility, faculty, departments, study materials, location, contact details, and general college information."
  });
}
