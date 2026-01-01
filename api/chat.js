export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const raw = (req.body.message || "").trim();
  if (!raw) {
    return res.json({ reply: "Please type your question." });
  }

  const q = raw.toLowerCase();

  /* =====================================================
     FULL STRUCTURED KNOWLEDGE BASE (ALL YOUR INFO)
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
    }
  };

  /* =====================================================
     INTENT MATCHING (SCOPED, NOT DUMPING)
  ===================================================== */

  const matchedSections = [];

  for (const key in KB) {
    const section = KB[key];
    for (const word of section.keywords) {
      if (q.includes(word)) {
        matchedSections.push(section.answer);
        break;
      }
    }
  }

  /* =====================================================
     RESPONSE
  ===================================================== */

  if (matchedSections.length > 0) {
    return res.json({
      reply: matchedSections.join("\n\n")
    });
  }

  return res.json({
    reply:
      "I can help you with admissions, courses, eligibility, faculty details, departments, study resources, campus environment, or contact information. Please ask about one of these."
  });
}
