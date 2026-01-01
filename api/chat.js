export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const q = req.body.message.toLowerCase();

  function has(words) {
    return words.some(w => q.includes(w));
  }

  /* =====================
     GREETINGS
  ===================== */
  if (has(["hi", "hello", "hey", "good morning", "good evening"])) {
    return res.json({
      reply:
        "Hello 👋 I’m the MIT First Grade College assistant. You can ask me about BCA, BBA, B.Com, admissions, faculty, facilities, or contact details."
    });
  }

  /* =====================
     COURSE DETAILS (SPECIFIC FIRST)
  ===================== */
  if (has(["bca", "computer application", "computer course"])) {
    return res.json({
      reply:
        "🎓 **BCA (Bachelor of Computer Applications)** is a 3-year undergraduate program focused on programming, software development, and IT skills.\n\n👉 You can explore BCA details on the Courses section of the website."
    });
  }

  if (has(["bcom", "b.com", "commerce"])) {
    return res.json({
      reply:
        "🎓 **B.Com (Bachelor of Commerce)** is a 3-year undergraduate program covering accounting, finance, taxation, and business studies.\n\n👉 Course details are available in the Courses section."
    });
  }

  if (has(["bba", "business administration", "management course"])) {
    return res.json({
      reply:
        "🎓 **BBA (Bachelor of Business Administration)** is a 3-year undergraduate program designed to build leadership and management skills.\n\n👉 More details are available in the Courses section of the website."
    });
  }

  /* =====================
     COURSES OFFERED (GENERAL)
  ===================== */
  if (has(["courses", "programs", "degrees"])) {
    return res.json({
      reply:
        "MIT First Grade College offers undergraduate programs:\n• BCA\n• BBA\n• B.Com\n\n👉 Please check the Courses section on the website for detailed curriculum."
    });
  }

  /* =====================
     ADMISSIONS
  ===================== */
  if (has(["admission", "apply", "join college"])) {
    return res.json({
      reply:
        "📝 **Admissions** are based on merit and University of Mysore guidelines.\n\n👉 You can apply by visiting the **Admissions section** of the website or directly visiting the college office."
    });
  }

  if (has(["eligibility", "who can apply"])) {
    return res.json({
      reply:
        "✅ Undergraduate eligibility: Completion of 10+2 or PUC from a recognized board.\n\n👉 Eligibility details are explained in the Admissions section."
    });
  }

  /* =====================
     FACULTY & QUALITY
  ===================== */
  if (has(["faculty", "teachers", "staff"])) {
    return res.json({
      reply:
        "👨‍🏫 MIT First Grade College has qualified and experienced faculty members with strong academic, research, and industry backgrounds.\n\n👉 Faculty profiles are available in the Faculty section of the website."
    });
  }

  if (has(["principal"])) {
    return res.json({
      reply:
        "🎓 **Principal:** Dr. Chandrajit Mohan (MCA, Ph.D)\n• 15 years teaching experience\n• 12 years research experience\n• Research publications, patents, and projects\n\n👉 Full profile is available on the website."
    });
  }

  /* =====================
     FACILITIES
  ===================== */
  if (has(["facility", "library", "lab", "infrastructure"])) {
    return res.json({
      reply:
        "🏫 The college provides facilities such as:\n• Library\n• Computer Labs\n• E-resources\n• Academic support services\n\n👉 Facility details can be viewed on the Facilities section of the website."
    });
  }

  /* =====================
     CONTACT (DIRECT – NO BULLSHIT)
  ===================== */
  if (has(["contact", "phone", "call", "number", "email", "address", "office"])) {
    return res.json({
      reply:
        "📞 **Phone:** 0821 233 1722\n" +
        "📍 **Address:** Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka\n" +
        "🕘 **Office Hours:** Monday–Saturday, 9:30 AM – 4:30 PM\n\n👉 You can also scroll to the Contact section of the website for directions."
    });
  }

  /* =====================
     PARENT QUESTIONS
  ===================== */
  if (has(["safe", "environment", "discipline", "parent"])) {
    return res.json({
      reply:
        "👨‍👩‍👧 The college provides a disciplined, safe, and student-friendly environment focused on academic growth and personal development."
    });
  }

  /* =====================
     SMART FALLBACK (NO DUMB ANSWERS)
  ===================== */
  return res.json({
    reply:
      "That’s a good question 👍\n\nYou can find this information by scrolling through the relevant section of the college website currently displayed in the background."
  });
}
