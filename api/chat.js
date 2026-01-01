export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const q = req.body.message.toLowerCase();

  /* =====================
     GREETINGS
  ===================== */
  if (/(hi|hello|hey|good morning|good evening)/.test(q)) {
    return res.json({
      reply:
        "Hello 👋 Welcome to MIT First Grade College. I can help you with admissions, courses, eligibility, faculty, facilities, and general information."
    });
  }

  /* =====================
     ABOUT COLLEGE / TRUST
  ===================== */
  if (q.includes("about") || q.includes("trust")) {
    return res.json({
      reply:
        "MIT First Grade College is managed by Maharaja Education Trust, founded by eminent academicians with extensive teaching and research experience. The Trust manages multiple educational institutions including schools, PU colleges, degree colleges, engineering, nursing, pharmacy, agriculture, and management institutions."
    });
  }

  /* =====================
     COURSES OFFERED
  ===================== */
  if (q.includes("course") || q.includes("program")) {
    return res.json({
      reply:
        "MIT First Grade College offers undergraduate programs: Bachelor of Computer Applications (BCA), Bachelor of Commerce (B.Com), and Bachelor of Business Administration (BBA)."
    });
  }

  /* =====================
     BCA DETAILS
  ===================== */
  if (q.includes("bca")) {
    return res.json({
      reply:
        "BCA is a 3-year undergraduate program (6 semesters) designed to build strong foundations in computer applications, programming, problem-solving, and communication skills. It prepares students for IT careers and higher studies like MCA or M.Sc Computer Science."
    });
  }

  if (q.includes("bca eligibility")) {
    return res.json({
      reply:
        "BCA eligibility: Candidates who have completed 10+2 or PUC with Mathematics, Computer Science, Business Mathematics, or Accountancy, or a 3-year diploma after SSLC in Computer Science / Information Science or equivalent."
    });
  }

  /* =====================
     B.COM DETAILS
  ===================== */
  if (q.includes("b.com") || q.includes("bcom")) {
    return res.json({
      reply:
        "B.Com is a 3-year undergraduate program focusing on commerce, accounting, taxation, finance, and management. It prepares students for careers in banking, accounting, finance, and higher education such as M.Com, MBA, CA, CS, and CWA."
    });
  }

  /* =====================
     BBA DETAILS
  ===================== */
  if (q.includes("bba")) {
    return res.json({
      reply:
        "BBA is a 3-year undergraduate program designed to develop management, leadership, entrepreneurship, and business decision-making skills."
    });
  }

  /* =====================
     DURATION
  ===================== */
  if (q.includes("duration") || q.includes("how long")) {
    return res.json({
      reply:
        "All undergraduate programs (BCA, BBA, B.Com) are 3 years in duration, divided into 6 semesters of 6 months each. The maximum duration allowed is 6 years as per university norms."
    });
  }

  /* =====================
     ADMISSIONS
  ===================== */
  if (q.includes("admission") || q.includes("apply")) {
    return res.json({
      reply:
        "Admissions at MIT First Grade College are based on merit and university guidelines. Interested students can apply by visiting the college office or through the official website."
    });
  }

  if (q.includes("documents")) {
    return res.json({
      reply:
        "Documents generally required include marks cards, transfer certificate, migration certificate (if applicable), ID proof, and passport-size photographs."
    });
  }

  if (q.includes("entrance")) {
    return res.json({
      reply:
        "There is no separate entrance examination. Admissions are based on eligibility and academic merit."
    });
  }

  /* =====================
     FACULTY & MANAGEMENT
  ===================== */
  if (q.includes("principal")) {
    return res.json({
      reply:
        "The Principal of MIT First Grade College is Dr. Chandrajit Mohan, MCA, KSET, Ph.D, with over 18 years of academic experience and specialization in Computer Vision, Machine Learning, and Management Information Systems."
    });
  }

  if (q.includes("faculty") || q.includes("staff")) {
    return res.json({
      reply:
        "MIT First Grade College has experienced and qualified faculty members across departments, specializing in areas such as Programming, Artificial Intelligence, Machine Learning, Data Structures, Networking, Operating Systems, Accounting, and Taxation."
    });
  }

  /* =====================
     FACILITIES
  ===================== */
  if (q.includes("facility") || q.includes("library") || q.includes("lab")) {
    return res.json({
      reply:
        "The college provides facilities such as library, computer laboratories, e-resources, and academic support services to enhance student learning."
    });
  }

  if (q.includes("e resource") || q.includes("question paper")) {
    return res.json({
      reply:
        "E-resources and previous question papers are available through the college’s official Google Drive repository for student reference."
    });
  }

  /* =====================
     CAREERS & OUTCOMES
  ===================== */
  if (q.includes("career") || q.includes("job") || q.includes("placement")) {
    return res.json({
      reply:
        "Graduates of MIT First Grade College are prepared for careers in IT, banking, accounting, finance, management, entrepreneurship, and public/private sector organizations."
    });
  }

  /* =====================
     LOCATION & CONTACT
  ===================== */
  if (q.includes("location") || q.includes("address")) {
    return res.json({
      reply:
        "MIT First Grade College is located in Mysuru, Karnataka. For exact address and directions, please visit the official website."
    });
  }

  if (q.includes("contact") || q.includes("phone")) {
    return res.json({
      reply:
        "For admissions and general inquiries, please contact the college office through the official MIT First Grade College website."
    });
  }

  /* =====================
     FALLBACK (SAFE)
  ===================== */
  return res.json({
    reply:
      "For detailed or updated information, please visit the official MIT First Grade College website or contact the college office."
  });
}
