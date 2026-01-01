export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const message = (req.body.message || "").toLowerCase().trim();

  if (!message) {
    return res.json({ reply: "Please type your question." });
  }

  /* =====================
     NORMALIZE INPUT
  ===================== */
  const q = message.replace(/[^a-z0-9 ]/g, "");

  /* =====================
     CONTACT
  ===================== */
  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("email") ||
    q.includes("mail") ||
    q.includes("address")
  ) {
    return res.json({
      reply:
        "📞 Phone: 0821 233 1722\n" +
        "📧 Email: chandrajithmmca@mitmysore.in\n" +
        "📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008\n" +
        "🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM"
    });
  }

  /* =====================
     ADMISSIONS
  ===================== */
  if (
    q.includes("admission") ||
    q.includes("apply") ||
    q.includes("join") ||
    q.includes("joining") ||
    q.includes("interested")
  ) {
    return res.json({
      reply:
        "📝 Admissions at MIT First Grade College are based on merit and University of Mysore guidelines.\n\n" +
        "Steps:\n" +
        "• Choose a course (BCA / BBA / B.Com)\n" +
        "• Ensure eligibility (10+2 or equivalent)\n" +
        "• Visit the college office with required documents\n\n" +
        "Required documents usually include marks cards, transfer certificate, ID proof, and photographs."
    });
  }

  /* =====================
     COURSES
  ===================== */
  if (q.includes("courses") || q.includes("programs") || q.includes("degree")) {
    return res.json({
      reply:
        "🎓 MIT First Grade College offers the following undergraduate programs:\n\n" +
        "• BCA – Bachelor of Computer Applications\n" +
        "• BBA – Bachelor of Business Administration\n" +
        "• B.Com – Bachelor of Commerce\n\n" +
        "All courses are 3 years (6 semesters) in duration."
    });
  }

  /* =====================
     BCA
  ===================== */
  if (q.includes("bca") || q.includes("computer")) {
    return res.json({
      reply:
        "🎓 BCA (Bachelor of Computer Applications) is a 3-year undergraduate program.\n\n" +
        "It focuses on programming, software development, problem-solving, and computer applications.\n\n" +
        "Career options include IT jobs, MCA, and M.Sc Computer Science."
    });
  }

  /* =====================
     DEPARTMENTS
  ===================== */
  if (q.includes("department") || q.includes("departments") || q.includes("streams")) {
    return res.json({
      reply:
        "🏫 Academic departments at MIT First Grade College:\n\n" +
        "• Computer Science (BCA)\n" +
        "• Commerce (B.Com)\n" +
        "• Management Studies (BBA)\n" +
        "• English (common to all programs)"
    });
  }

  /* =====================
     FACULTY & PRINCIPAL
  ===================== */
  if (
    q.includes("faculty") ||
    q.includes("teachers") ||
    q.includes("staff") ||
    q.includes("principal")
  ) {
    return res.json({
      reply:
        "👨‍🏫 MIT First Grade College has experienced and qualified faculty.\n\n" +
        "The Principal is Dr. Chandrajit Mohan (MCA, Ph.D) with:\n" +
        "• 15 years teaching experience\n" +
        "• 3 years industry experience\n" +
        "• 12 years research experience\n\n" +
        "Faculty members across departments focus on quality teaching and student development."
    });
  }

  /* =====================
     ENVIRONMENT / GOOD COLLEGE
  ===================== */
  if (
    q.includes("good college") ||
    q.includes("worth") ||
    q.includes("safe") ||
    q.includes("environment")
  ) {
    return res.json({
      reply:
        "MIT First Grade College provides a disciplined, safe, and student-friendly environment.\n\n" +
        "With experienced faculty, structured academic programs, and a focus on overall development, it is a good choice for students and parents."
    });
  }

  /* =====================
     STUDY MATERIAL / NOTES
  ===================== */
  if (
    q.includes("notes") ||
    q.includes("study material") ||
    q.includes("pdf") ||
    q.includes("question paper")
  ) {
    return res.json({
      reply:
        "📚 Study materials, e-resources, and previous question papers are provided to students through official college channels and faculty support."
    });
  }

  /* =====================
     SAFE FALLBACK (HUMAN, NOT BOT)
  ===================== */
  return res.json({
    reply:
      "I can help you with admissions, courses (BCA, BBA, B.Com), faculty details, departments, campus environment, study resources, or contact information. Please ask about one of these."
  });
}
