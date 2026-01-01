import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const q = req.body.message.toLowerCase();
  const has = (arr) => arr.some(w => q.includes(w));

  /* =====================
     COLLEGE KNOWLEDGE BASE
  ===================== */

  const knowledge = {
    principal: `
The Principal of MIT First Grade College is Dr. Chandrajit Mohan (MCA, Ph.D).
He has 15 years of teaching experience, 3 years of industry experience, and 12 years of research experience.
He has published 25 research papers, authored 3 textbooks, holds 2 patents, completed 2 projects, and is currently guiding 5 research scholars.
`,

    faculty: `
MIT First Grade College has highly qualified and experienced faculty.

Computer Science / BCA faculty include:
Dr. Chandrajit Mohan, Arvind G, Shivaprasad D L, Suhas B Raj, Yashaswini K, Bhoomika M M, Parvathi G, Yashashwini B, Renukadevi M, and Abilasha C.
Faculty experience ranges from 1 to 15 years with expertise in programming, AI, machine learning, networking, and software engineering.

English Department faculty include:
Reena Sateesh (19 years experience), Rakshith Kesari (9 years), and Manasa.
`,

    departments: `
Academic departments include Computer Science (BCA), Commerce (B.Com), Management Studies (BBA), and English.
`,

    courses: `
Courses offered are BCA, BBA, and B.Com.
All programs are undergraduate and are 3 years in duration (6 semesters).
`,

    bca: `
BCA (Bachelor of Computer Applications) is a 3-year undergraduate program focused on programming, software development, problem-solving, and computer applications.
It prepares students for IT careers and higher studies like MCA or M.Sc Computer Science.
`,

    environment: `
The college provides a disciplined, safe, and student-friendly academic environment.
It focuses on academic excellence, mentoring, and holistic student development.
`,

    contact: `
Phone: 0821 233 1722
Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008
Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM
`
  };

let context = "";

if (has(["principal", "head"])) {
  context = knowledge.principal;
}
else if (has(["faculty", "teacher", "staff", "experience", "experienced", "quality"])) {
  context = knowledge.faculty;
}
else if (has(["department", "stream"])) {
  context = knowledge.departments;
}
else if (has(["bca", "computer"])) {
  context = knowledge.bca;
}
else if (has(["course", "program", "degree"])) {
  context = knowledge.courses;
}
else if (has(["safe", "environment", "discipline", "parent"])) {
  context = knowledge.environment;
}
else if (has(["contact", "phone", "address", "office"])) {
  context = knowledge.contact;
}


  /* =====================
     NO MATCH → GUIDED AI RESPONSE
  ===================== */

  if (!context) {
    return res.json({
      reply:
        "I can help with faculty details, departments, BCA/BBA/B.Com courses, academic environment, or contact information. What would you like to know?"
    });
  }

  /* =====================
     GEMINI REPHRASING
  ===================== */

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a polite college admission counselor.
Using ONLY the information below, answer the user's question in a friendly, human way.
Do NOT add any new facts.

USER QUESTION:
${req.body.message}

COLLEGE INFORMATION:
${context}
`
                }
              ]
            }
          ]
        })
      }
    );

   const reply =
  data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

if (reply) {
  return res.json({ reply });
}

// fallback ONLY if Gemini truly fails
return res.json({ reply: context });


    return res.json({ reply });
  } catch (error) {
    return res.json({ reply: context });
  }
}

