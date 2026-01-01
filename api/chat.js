import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const userMessage = req.body.message || "";
  const q = userMessage.toLowerCase();

  // smarter intent matching
  const has = (words) =>
    words.some(
      w =>
        q.includes(w) ||
        q.includes(w + "d") ||
        q.includes(w + "ed") ||
        q.includes(w + "ing")
    );

  /* =====================
     VERIFIED KNOWLEDGE BASE
  ===================== */

  const knowledge = {
    principal: `The Principal of MIT First Grade College is Dr. Chandrajit Mohan (MCA, Ph.D).

He has:
• 15 years of teaching experience  
• 3 years of industry experience  
• 12 years of research experience  

Academic contributions include:
• 25 research publications  
• 3 textbooks authored  
• 2 patents  
• 2 research projects  
• Research guide for 5 scholars  

He is a member of the Board of Studies in Computer Science and the College Development Advisory Committee, University of Mysore.`,

    faculty: `MIT First Grade College has experienced and qualified faculty across departments.

🔹 Computer Science / BCA faculty:
Dr. Chandrajit Mohan, Arvind G, Shivaprasad D L, Suhas B Raj, Yashaswini K, Bhoomika M M, Parvathi G, Yashashwini B, Renukadevi M, Abilasha C.

Faculty experience ranges from 1 to 15 years with expertise in programming, AI, machine learning, networking, operating systems, and software engineering.

🔹 English Department faculty:
Reena Sateesh (19 years experience), Rakshith Kesari (9 years), and Manasa.`,

    departments: `MIT First Grade College has the following academic departments:
• Computer Science (BCA)
• Commerce (B.Com)
• Management Studies (BBA)
• English (common to all programs)

All departments follow the University of Mysore curriculum.`,

    courses: `MIT First Grade College offers undergraduate programs:
• BCA – Bachelor of Computer Applications
• BBA – Bachelor of Business Administration
• B.Com – Bachelor of Commerce

All programs are 3 years in duration (6 semesters).`,

    bca: `BCA (Bachelor of Computer Applications) is a 3-year undergraduate program focused on programming, software development, problem-solving, and computer applications.

It prepares students for IT careers and higher studies such as MCA or M.Sc Computer Science.`,

    environment: `The college provides a disciplined, safe, and student-friendly academic environment.

It focuses on academic excellence, mentoring, research exposure, and holistic student development. This makes it suitable and reassuring for parents as well.`,

    contact: `📞 Phone: 0821 233 1722
📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka
🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM`
  };

  /* =====================
     INTENT RESOLUTION
  ===================== */

  let context = "";

  if (has(["principal", "head"])) {
    context = knowledge.principal;
  } else if (has(["faculty", "teacher", "staff", "experience", "experienced"])) {
    context = knowledge.faculty;
  } else if (has(["department", "departments", "stream"])) {
    context = knowledge.departments;
  } else if (has(["bca", "computer application"])) {
    context = knowledge.bca;
  } else if (has(["course", "courses", "program", "degree"])) {
    context = knowledge.courses;
  } else if (has(["safe", "environment", "discipline", "parent"])) {
    context = knowledge.environment;
  } else if (has(["contact", "phone", "address", "office", "call"])) {
    context = knowledge.contact;
  }

  /* =====================
     IF NO CONTEXT → SMART GUIDANCE
  ===================== */

  if (!context) {
    return res.json({
      reply:
        "I can help with faculty details, departments, courses (BCA, BBA, B.Com), academic environment, or contact information. What would you like to know?"
    });
  }

  /* =====================
     GEMINI (LANGUAGE POLISH ONLY)
  ===================== */

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a polite college admission counselor.
Answer the user's question using ONLY the information below.
Do not add new facts.

USER QUESTION:
${userMessage}

COLLEGE INFORMATION:
${context}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiRes.json();
    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // if Gemini gives a valid answer, use it
    if (aiReply) {
      return res.json({ reply: aiReply });
    }

    // otherwise, fall back to verified knowledge
    return res.json({ reply: context });

  } catch (err) {
    // Gemini failed → return truth, not bullshit
    return res.json({ reply: context });
  }
}
