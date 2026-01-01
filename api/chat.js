import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const userMessage = (req.body.message || "").trim();
  if (!userMessage) {
    return res.json({ reply: "Please type your question." });
  }

  /* =====================
     VERIFIED COLLEGE DATA (SINGLE SOURCE OF TRUTH)
  ===================== */
  const knowledge = {
    contact: {
      text: `📞 Phone: 0821 233 1722
📧 Email: chandrajithmmca@mitmysore.in
📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008
🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM`,
    },

    admissions: {
      text: `📝 **Admissions at MIT First Grade College**

Admissions are based on merit and University of Mysore guidelines.

Steps:
• Choose course (BCA / BBA / B.Com)
• Ensure eligibility (10+2 or equivalent)
• Visit college office with required documents

Documents:
• Marks cards
• Transfer Certificate
• ID proof
• Passport-size photographs`,
    },

    courses: {
      text: `🎓 **Courses Offered**
• BCA – Bachelor of Computer Applications
• BBA – Bachelor of Business Administration
• B.Com – Bachelor of Commerce

All programs are undergraduate and of 3 years (6 semesters).`,
    },

    bca: {
      text: `🎓 **BCA (Bachelor of Computer Applications)**

A 3-year undergraduate program focused on programming, software development, problem-solving, and computer applications.

Career paths include IT jobs, MCA, and M.Sc Computer Science.`,
    },

    faculty: {
      text: `👨‍🏫 **Faculty & Academic Leadership**

Principal: **Dr. Chandrajit Mohan (MCA, Ph.D)**
• 15 years teaching experience
• 3 years industry experience
• 12 years research experience
• 25 publications, 3 textbooks, 2 patents

The college has experienced faculty across Computer Science, Commerce, Management, and English departments.`,
    },

    departments: {
      text: `🏫 **Academic Departments**
• Computer Science (BCA)
• Commerce (B.Com)
• Management Studies (BBA)
• English (common to all programs)`,
    },

    environment: {
      text: `🏫 **Campus Environment**

The college provides a disciplined, safe, and student-friendly environment with academic focus, mentoring, and parental assurance.`,
    },

    resources: {
      text: `📚 **Study Resources**

Students are provided with e-resources, previous question papers, and academic guidance through official college channels and faculty support.`,
    },
  };

  /* =====================
     STEP 1: AI INTENT DETECTION (ROBUST)
  ===================== */
  let intent = null;

  try {
    const intentRes = await fetch(
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
Classify the user's intent into ONE OR TWO of these labels:
contact, admissions, courses, bca, faculty, departments, environment, resources, unknown

User message:
"${userMessage}"

Rules:
- Use "contact" for email/phone/mail/address
- Use "resources" for notes, pdfs, study material
- Use "admissions" for joining, interest, applying
- Return comma-separated if multiple apply
- Return "unknown" if unclear

Reply with ONLY labels.
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const raw =
      intentRes?.json &&
      (await intentRes.json())?.candidates?.[0]?.content?.parts?.[0]?.text;

    intent = raw ? raw.toLowerCase().trim() : null;
  } catch {
    intent = null;
  }

  /* =====================
     STEP 2: RESOLVE INTENT(S)
  ===================== */
  let intents = [];

  if (intent && intent !== "unknown") {
    intents = intent.split(",").map(i => i.trim()).filter(i => knowledge[i]);
  }

  // If AI failed, do soft fallback matching (covers typos, slang)
  if (intents.length === 0) {
    const q = userMessage.toLowerCase();
    if (q.match(/mail|email|phone|call|reach|address/)) intents.push("contact");
    else if (q.match(/admis|join|apply|enrol|interest/)) intents.push("admissions");
    else if (q.match(/bca|computer/)) intents.push("bca");
    else if (q.match(/course|degree|program/)) intents.push("courses");
    else if (q.match(/faculty|teacher|staff|principal/)) intents.push("faculty");
    else if (q.match(/dept|department|stream/)) intents.push("departments");
    else if (q.match(/safe|parent|environment|campus/)) intents.push("environment");
    else if (q.match(/note|pdf|material|resource/)) intents.push("resources");
  }

  /* =====================
     STEP 3: HUMAN RESPONSE (NO DUMB FALLBACKS)
  ===================== */
  if (intents.length === 0) {
    return res.json({
      reply:
        "I want to help you properly 🙂\n\nYou can ask about admissions, courses, faculty, departments, study resources, campus environment, or contact details. Could you rephrase your question?",
    });
  }

  // Merge all relevant knowledge
  const mergedText = intents.map(i => knowledge[i].text).join("\n\n");

  /* =====================
     STEP 4: GEMINI — LANGUAGE ONLY
  ===================== */
  try {
    const answerRes = await fetch(
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
You are a polite college admission counsellor.
Answer naturally using ONLY the information below.
Do not add facts.

User question:
"${userMessage}"

Information:
${mergedText}
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await answerRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return res.json({ reply: reply || mergedText });
  } catch {
    return res.json({ reply: mergedText });
  }
}
