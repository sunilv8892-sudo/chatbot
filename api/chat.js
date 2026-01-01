export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const userMessage = (req.body.message || "").toLowerCase().trim();
  if (!userMessage) {
    return res.json({ reply: "Please type your question." });
  }

  /* =====================================================
     FULL OFFICIAL KNOWLEDGE BASE (FROM YOUR FILES)
  ===================================================== */

  const KB = `
MIT FIRST GRADE COLLEGE (MIT FGC)

ABOUT TRUST:
Maharaja Education Trust was founded by eminent academicians with extensive teaching and research experience.
All trustees hold doctoral degrees and have held leadership positions at national and international levels.
The Trust manages schools, PU colleges, degree colleges, engineering colleges, Ayurveda college and hospital,
nursing college, agriculture and management institutions, and a pharmacy college.

COURSES OFFERED:
Undergraduate Programs:
- BCA (Bachelor of Computer Applications)
- B.Com (Bachelor of Commerce)
- BBA (Bachelor of Business Administration)

COURSE DURATION:
All undergraduate programs are 3 years in duration, divided into 6 semesters (6 months each).
Maximum duration allowed is 6 years as per University of Mysore norms.

BCA COURSE INFORMATION:
BCA is an undergraduate degree in computer applications.
It prepares students for careers in IT, banking, management, public/private sector, non-profit organizations, and entrepreneurship.
It also prepares students for higher education such as MCA and M.Sc Computer Science.

BCA ELIGIBILITY:
Candidates must have completed 10+2 or PUC or equivalent with Mathematics / Computer Science / Business Mathematics / Accountancy
OR a 3-year diploma after SSLC in Computer Science Engineering / Information Science Engineering.

B.COM COURSE INFORMATION:
B.Com is an undergraduate degree in commerce focusing on accounting, finance, taxation, and management.
Career options include banking, finance, accounting, management, CA, CS, CWA, MBA, and M.Com.

B.COM ELIGIBILITY:
Candidates who passed 10+2 in any discipline are eligible.
Diploma holders and job-oriented course candidates may be eligible for lateral entry as per university norms.

BBA COURSE INFORMATION:
BBA is an undergraduate program focused on management, leadership, entrepreneurship, and business administration.

DEPARTMENTS:
- Computer Science (BCA)
- Commerce (B.Com)
- Management Studies (BBA)
- English
- Political Science
- Commerce & Taxation

PRINCIPAL:
Name: Dr. Chandrajit Mohan
Qualification: MCA, KSET, Ph.D
Experience: 18+ Years
Specialization: Computer Vision, Machine Learning, Management Information Systems, Programming Languages
Email: chandrajithmmca@mitmysore.in
Teaching Experience: 15 Years
Industry Experience: 3 Years
Research Experience: 12 Years
Research Publications: 25
Text Books: 3
Patents: 2
Projects: 2
Research Scholars: 5
Academic Memberships:
- Board of Studies in Computer Science
- College Development Advisory Committee, University of Mysore

COMPUTER SCIENCE FACULTY:
Arvind G – MCA, PGDSD, Ph.D – 18+ Years – Networks, C, Data Structures, Python, AI, ML
Abhilasha C – M.Sc, KSET – 1+ Years – C, C++, C#, OS, Python
Yashaswini B – MCA – 2+ Years – C, C++, Python, Data Structures
Shivaprasad D L – M.Sc, KSET – 3+ Years – AI, Pattern Recognition, Video Processing, Biometrics
Yashaswini K – MCA – 1+ Years – Java, Android, DBMS, OS
Renukadevi M – BE, M.Tech – 6+ Years – Networking, NAS
Parvathi G – M.Sc – 1+ Years – Data Structures, ML, OS
Minu B V – MCA – 1 Year – Programming, ML, OS
Suchithra N – M.Sc – 1 Year – Programming, ML, OS
Pavithra H S – M.Sc – 1 Year – Programming, ML, OS
Bhoomika M M – M.Sc – 1+ Years – Java, Networking, Data Analytics

ENGLISH DEPARTMENT:
Reena Sateesh – MA, M.Phil – 19 Years
Rakshith Kesari – MA, KSET – 9 Years
Manasa – MA – 6 Months

POLITICAL SCIENCE:
Kumar R – MA Political Science – 20+ Years – Indian Constitution and Polity

COMMERCE:
Madhu M – M.Com, NET, KSET – 4+ Years – Taxation

NON-TEACHING STAFF:
Manager, Superintendent, Accountant, Clerk, System Administrator, Data Entry Operator, Group D staff.

E-RESOURCES:
Study materials, notes, and previous question papers are available at:
https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD

CONTACT DETAILS:
Phone: 0821 233 1722
Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka
Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM
`;

  /* =====================================================
     SIMPLE INTELLIGENT MATCHING
  ===================================================== */

  const keywords = userMessage.split(" ");

  let matchedInfo = "";

  for (const word of keywords) {
    if (KB.toLowerCase().includes(word)) {
      matchedInfo = KB;
      break;
    }
  }

  /* =====================================================
     RESPONSE
  ===================================================== */

  if (matchedInfo) {
    return res.json({
      reply:
        "Here is the information related to your question based on official college details:\n\n" +
        matchedInfo
    });
  }

  return res.json({
    reply:
      "I can answer questions about courses, eligibility, admissions, faculty, departments, principal, e-resources, trust, or contact details of MIT First Grade College."
  });
}
