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
        "Hello 👋 Welcome to MIT First Grade College. I can help you with admissions, courses, faculty details, eligibility, and general information."
    });
  }

  /* =====================
     PRINCIPAL DETAILS
  ===================== */
  if (q.includes("principal")) {
    return res.json({
      reply:
        "The Principal of MIT First Grade College is Dr. Chandrajit Mohan, M.C.A, Ph.D. He has 15 years of teaching experience, 3 years of industry experience, and 12 years of research experience. He has published 25 research papers, authored 3 textbooks, holds 2 patents, completed 2 projects, and is currently guiding 5 research scholars."
    });
  }

  if (q.includes("principal email") || q.includes("contact principal")) {
    return res.json({
      reply:
        "The email ID of the Principal, Dr. Chandrajit Mohan, is chandrajithmmca@mitmysore.in."
    });
  }

  /* =====================
     ACADEMIC BODY MEMBERSHIP
  ===================== */
  if (q.includes("bos") || q.includes("academic body") || q.includes("committee")) {
    return res.json({
      reply:
        "Dr. Chandrajit Mohan is a Member of the Board of Studies in Computer Science and also serves on the College Development Advisory Committee of the University of Mysore."
    });
  }

  /* =====================
     COMPUTER SCIENCE FACULTY
  ===================== */
  if (q.includes("computer science faculty") || q.includes("bca faculty")) {
    return res.json({
      reply:
        "The Computer Science department has experienced faculty including Dr. Chandrajit Mohan (Principal), Arvind G, Shivaprasad D L, Suhas B. Raj, Yashaswini K, Bhoomika M.M., Parvathi G., Yashashwini B., Renukadevi M, and Abilasha C, with teaching experience ranging from 1 to 15 years."
    });
  }

  if (q.includes("faculty qualification")) {
    return res.json({
      reply:
        "Faculty members at MIT First Grade College hold qualifications such as MCA, M.Sc, M.Tech, NET, KSET, and Ph.D., ensuring strong academic and professional expertise."
    });
  }

  /* =====================
     ENGLISH DEPARTMENT FACULTY
  ===================== */
  if (q.includes("english faculty") || q.includes("english department")) {
    return res.json({
      reply:
        "The English Department faculty includes Reena Sateesh (MA, M.Phil, 19 years experience), Rakshith Kesari (MA, KSET, 9 years experience), and Manasa (MA, 6 months experience)."
    });
  }

  /* =====================
     FACULTY EXPERIENCE (PARENTS)
  ===================== */
  if (q.includes("experienced faculty") || q.includes("teaching quality")) {
    return res.json({
      reply:
        "MIT First Grade College has qualified and experienced faculty members with strong teaching, industry, and research backgrounds, ensuring quality education for students."
    });
  }

  /* =====================
     COURSES
  ===================== */
  if (q.includes("course") || q.includes("program")) {
    return res.json({
      reply:
        "MIT First Grade College offers undergraduate programs including BCA, BBA, and B.Com."
    });
  }

  /* =====================
     ADMISSIONS
  ===================== */
  if (q.includes("admission") || q.includes("apply")) {
    return res.json({
      reply:
        "Admissions at MIT First Grade College are based on merit and university guidelines. Students can apply by visiting the college office or through the official website."
    });
  }

  /* =====================
     LOCATION
  ===================== */
  if (q.includes("location") || q.includes("address")) {
    return res.json({
      reply:
        "MIT First Grade College is located in Mysuru, Karnataka. For exact address details, please visit the official website."
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
