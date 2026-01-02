return res.status(405).json({ reply: "Method not allowed" });
}

  const raw = (req.body.message || "").trim();
  const raw = (req.body.message || "").toLowerCase().trim();
if (!raw) {
return res.json({ reply: "Please type your question." });
}

  const q = raw.toLowerCase();
  // Normalize input heavily
  const q = raw
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* =====================================================
     FULL STRUCTURED KNOWLEDGE BASE (ALL YOUR INFO)
     COMMON HELPERS
 ===================================================== */

  const KB = {
    contact: {
      keywords: ["contact", "phone", "call", "email", "mail", "address", "reach"],
      answer: `
📞 Phone: 0821 233 1722
📧 Email: chandrajithmmca@mitmysore.in
📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka
🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM
      `.trim()
    },

    trust: {
      keywords: ["trust", "management", "maharaja", "founder"],
      answer: `
MIT First Grade College is managed by **Maharaja Education Trust**.

The Trust was founded by eminent academicians with extensive teaching and research experience.
All trustees hold doctoral degrees and have held leadership positions at national and international levels.

The Trust manages:
• Schools
• PU Colleges
• Degree Colleges
• Engineering Colleges
• Ayurveda College & Hospital
• Nursing College
• Agriculture & Management Institutions
• Pharmacy College
      `.trim()
    },

    courses: {
      keywords: ["course", "courses", "program", "degree", "offer"],
      answer: `
🎓 **Courses Offered at MIT First Grade College**

Undergraduate Programs:
• BCA – Bachelor of Computer Applications
• BBA – Bachelor of Business Administration
• B.Com – Bachelor of Commerce

All programs follow the University of Mysore curriculum.
      `.trim()
    },

    duration: {
      keywords: ["duration", "years", "semester", "how long"],
      answer: `
⏳ **Course Duration**

All undergraduate programs are:
• 3 years duration
• 6 semesters (6 months each)

Maximum duration allowed to complete a program is **6 years**, as per University of Mysore norms.
      `.trim()
    },

    bca: {
      keywords: ["bca", "computer application", "computer course"],
      answer: `
🎓 **BCA – Bachelor of Computer Applications**

BCA is an undergraduate program focused on computer applications.

Key outcomes:
• IT and software careers
• Banking and management roles
• Public and private sector jobs
• Entrepreneurship
• Higher studies such as MCA and M.Sc Computer Science
      `.trim()
    },

    bcaEligibility: {
      keywords: ["bca eligibility", "eligible for bca"],
      answer: `
✅ **BCA Eligibility**

Candidates must have:
• 10+2 / PUC with Mathematics, Computer Science, Business Mathematics, or Accountancy
OR
• 3-year diploma after SSLC in Computer Science Engineering / Information Science Engineering
      `.trim()
    },

    bcom: {
      keywords: ["bcom", "b.com", "commerce"],
      answer: `
🎓 **B.Com – Bachelor of Commerce**

B.Com focuses on:
• Accounting
• Finance
• Taxation
• Management

Career options include:
• Banking & Finance
• Accounting
• CA / CS / CWA
• MBA / M.Com
      `.trim()
    },

    bcomEligibility: {
      keywords: ["bcom eligibility", "b.com eligibility"],
      answer: `
✅ **B.Com Eligibility**

Candidates who have passed 10+2 in any discipline are eligible.

Diploma holders and job-oriented course candidates may be eligible for lateral entry as per university norms.
      `.trim()
    },

    bba: {
      keywords: ["bba", "business administration", "management course"],
      answer: `
🎓 **BBA – Bachelor of Business Administration**

BBA focuses on:
• Management principles
• Leadership skills
• Entrepreneurship
• Business administration
      `.trim()
    },

    departments: {
      keywords: ["department", "departments", "streams"],
      answer: `
🏫 **Academic Departments**

• Computer Science (BCA)
• Commerce (B.Com)
• Management Studies (BBA)
• English
• Political Science
• Commerce & Taxation
      `.trim()
    },

    principal: {
      keywords: ["principal", "head", "dr chandrajit"],
      answer: `
🎓 **Principal – Dr. Chandrajit Mohan**

Qualifications:
• MCA, KSET, Ph.D

Experience:
• 18+ years total
• 15 years teaching
• 3 years industry
• 12 years research

Academic Contributions:
• 25 research publications
• 3 textbooks
• 2 patents
• 2 projects
• Research guide for 5 scholars

Specialization:
• Computer Vision
• Machine Learning
• Management Information Systems
• Programming Languages

Academic Memberships:
• Board of Studies – Computer Science
• College Development Advisory Committee, University of Mysore
      `.trim()
    },

    faculty: {
      keywords: ["faculty", "teachers", "staff", "experienced"],
      answer: `
👨‍🏫 **Faculty Overview**

MIT First Grade College has qualified and experienced faculty across departments.

Computer Science faculty specialize in:
• Programming
• Data Structures
• AI & Machine Learning
• Networking
• Operating Systems

Commerce faculty specialize in:
• Accounting
• Taxation
• Finance

English and Political Science departments have senior faculty with decades of experience.
      `.trim()
    },

    csFaculty: {
      keywords: ["computer science faculty", "bca faculty"],
      answer: `
💻 **Computer Science Faculty**

• Arvind G – MCA, PGDSD, Ph.D – 18+ Years – Networks, Python, AI, ML
• Abhilasha C – M.Sc, KSET – C, C++, OS, Python
• Yashaswini B – MCA – C, Python, Data Structures
• Shivaprasad D L – M.Sc, KSET – AI, Biometrics
• Yashaswini K – MCA – Java, Android, DBMS
• Renukadevi M – BE, M.Tech – Networking
• Bhoomika M M – M.Sc – Java, Data Analytics
      `.trim()
    },

    resources: {
      keywords: ["notes", "study material", "pdf", "question paper"],
      answer: `
📚 **E-Resources**

Study materials, notes, and previous question papers are available at:

https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD
      `.trim()
    },

    environment: {
      keywords: ["good college", "safe", "environment", "worth", "parent"],
      answer: `
🏫 **Campus Environment**

MIT First Grade College provides:
• Disciplined academic atmosphere
• Safe and student-friendly campus
• Focus on academic excellence and mentoring

It is suitable for both students and parents seeking quality education.
      `.trim()
  function hasAny(words) {
    for (let w of words) {
      if (q.includes(w)) return true;
}
  };
    return false;
  }

/* =====================================================
     INTENT MATCHING (SCOPED, NOT DUMPING)
     LOCATION / ADDRESS (YOU COMPLAINED ABOUT THIS)
 ===================================================== */

  const matchedSections = [];
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

  for (const key in KB) {
    const section = KB[key];
    for (const word of section.keywords) {
      if (q.includes(word)) {
        matchedSections.push(section.answer);
        break;
      }
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
     RESPONSE
     ELIGIBILITY
 ===================================================== */

  if (matchedSections.length > 0) {
  if (
    hasAny([
      "eligibility", "eligible", "qualification",
      "criteria", "who can apply", "requirements"
    ])
  ) {
return res.json({
      reply: matchedSections.join("\n\n")
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
      "I can help you with admissions, courses, eligibility, faculty details, departments, study resources, campus environment, or contact information. Please ask about one of these."
      "I can help you with admissions, courses (BCA, BBA, B.Com), eligibility, faculty, departments, study materials, location, contact details, and general college information."
});
}
