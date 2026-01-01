export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const q = req.body.message.toLowerCase();

  const has = (arr) => arr.some(w => q.includes(w));

  /* =====================
     KNOWLEDGE BASE
  ===================== */

  const knowledge = {
    principal: `
The Principal of MIT First Grade College is **Dr. Chandrajit Mohan (MCA, Ph.D)**.

He has:
• 15 years of teaching experience  
• 3 years of industry experience  
• 12 years of research experience  

Academic contributions:
• 25 research publications  
• 3 textbooks authored  
• 2 patents  
• 2 funded projects  
• Research guide for 5 scholars  

He is also a member of the Board of Studies in Computer Science and part of the College Development Advisory Committee, University of Mysore.
`,

    faculty: `
MIT First Grade College has **qualified and experienced faculty** across departments.

🔹 **Computer Science / BCA Faculty** include:
Dr. Chandrajit Mohan, Arvind G, Shivaprasad D L, Suhas B Raj, Yashaswini K, Bhoomika M M, Parvathi G, Yashashwini B, Renukadevi M, Abilasha C.

Teaching experience ranges from **1 to 15 years**, with expertise in:
Programming, AI, Machine Learning, Data Structures, Networks, Operating Systems, and Software Engineering.

🔹 **English Department Faculty**:
• Reena Sateesh (MA, M.Phil – 19 years)
• Rakshith Kesari (MA, KSET – 9 years)
• Manasa (MA – 6 months)

Faculty members are student-focused, research-oriented, and academically strong.
`,

    departments: `
🏫 **Academic Departments at MIT First Grade College**:
• Computer Science (BCA)
• Commerce (B.Com)
• Management Studies (BBA)
• English (common to all programs)

Each department follows the University of Mysore curriculum and is supported by experienced faculty.
`,

    courses: `
🎓 **Courses Offered**:
• BCA – Bachelor of Computer Applications
• BBA – Bachelor of Business Administration
• B.Com – Bachelor of Commerce

All programs are **3 years (6 semesters)** in duration.
`,

    bca: `
🎓 **BCA (Bachelor of Computer Applications)** is a 3-year undergraduate program focused on:
• Programming
• Software development
• Computer applications
• Problem-solving & communication skills

Career paths include IT jobs, MCA, M.Sc Computer Science, and related fields.
`,

    environment: `
MIT First Grade College provides a **disciplined, safe, and student-friendly environment**.

The college focuses on:
• Academic excellence
• Faculty mentoring
• Holistic student development
• Career readiness

Parents can be assured of a supportive learning atmosphere.
`,

    contact: `
📞 **Phone:** 0821 233 1722  
📍 **Address:** Mananthavadi Road, Vidyaranyapura, Mysuru – 570008  
🕘 **Office Hours:** Monday to Saturday, 9:30 AM – 4:30 PM
`
  };

  /* =====================
     INTENT DETECTION
  ===================== */

  let answer = "";

  if (has(["principal", "head of college"])) {
    answer = knowledge.principal;
  }
  else if (has(["faculty", "teachers", "professors", "staff", "experience"])) {
    answer = knowledge.faculty;
  }
  else if (has(["department", "departments", "streams"])) {
    answer = knowledge.departments;
  }
  else if (has(["course", "courses", "programs"])) {
    answer = knowledge.courses;
  }
  else if (has(["bca", "computer application"])) {
    answer = knowledge.bca;
  }
  else if (has(["safe", "environment", "parent", "discipline"])) {
    answer = knowledge.environment;
  }
  else if (has(["contact", "phone", "number", "address", "office"])) {
    answer = knowledge.contact;
  }

  /* =====================
     SMART RESPONSE (NO DUMB FALLBACK)
  ===================== */

  if (!answer) {
    return res.json({
      reply:
        "I can help you with **faculty details, departments, courses (BCA, BBA, B.Com), academic environment, or contact information**. What would you like to know?"
    });
  }

  return res.json({ reply: answer });
}
