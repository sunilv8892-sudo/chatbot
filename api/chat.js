import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const userMessage = req.body.message || "";
  const q = userMessage.toLowerCase();

  /* =====================
     INTENT DETECTION (CORE FIX)
  ===================== */

  const intents = {
    CONTACT: [
      "contact", "phone", "number", "call", "email", "mail",
      "address", "office", "reach", "communication"
    ],

    ADMISSIONS: [
      "admission", "admit", "join", "joining", "apply",
      "enroll", "enrol", "interested", "i want", "looking for"
    ],

    FACULTY: [
      "faculty", "teacher", "teachers", "staff",
      "experienced", "experience", "professor", "principal"
    ],

    COURSES: [
      "course", "courses", "program", "degree",
      "bca", "bba", "bcom", "b.com", "computer", "commerce", "management"
    ],

    DEPARTMENTS: [
      "department", "departments", "streams"
    ],

    ENVIRONMENT: [
      "safe", "environment", "discipline", "parent", "campus life"
    ]
  };

  const detectIntent = () => {
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(k => q.includes(k))) {
        return intent;
      }
    }
    return null;
  };

  const intent = detectIntent();

  /* =====================
     VERIFIED KNOWLEDGE BASE
  ===================== */

  const knowledge = {
    CONTACT: `📞 **Phone:** 0821 233 1722
📧 **Email:** chandrajithmmca@mitmysore.in
📍 **Address:** Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka
🕘 **Office Hours:** Monday to Saturday, 9:30 AM – 4:30 PM`,

    ADMISSIONS: `📝 **Admissions at MIT First Grade College**

Admissions are based on merit and University of Mysore guidelines.

**How to proceed:**
• Choose your course (BCA / BBA / B.Com)
• Ensure eligibility (10+2 or equivalent)
• Visit the college office with required documents

**Common documents required:**
• Marks cards
• Transfer Certificate
• ID proof
• Passport-size photographs`,

    FACULTY: `👨‍🏫 **Faculty & Academic Leadership**

The Principal is **Dr. Chandrajit Mohan (MCA, Ph.D)** with:
• 15 years teaching experience
• 3 years industry experience
• 12 years research experience
• 25 research publications, 3 textbooks, 2 patents

The college has experienced faculty across departments with expertise in programming, AI, machine learning, commerce, management, and English.`,

    COURSES: `🎓 **Courses Offered**

• BCA – Bachelor of Computer Applications
• BBA – Bachelor of Business Administration
• B.Com – Bachelor of Commerce

All programs are undergraduate and of **3 years (6 semesters)** duration.`,

    DEPARTMENTS: `🏫 **Academic Departments**

• Computer Science (BCA)
• Commerce (B.Com)
• Management Studies (BBA)
• English (common to all programs)`,

    ENVIRONMENT: `🏫 **Campus Environment**

The college provides a disciplined, safe, and student-friendly environment with strong academic focus, mentoring, and parental assurance.`
  };

  /* =====================
     RESPONSE STRATEGY
  ===================== */

  if (!intent) {
    return res.json({
      reply:
        "I can help you with admissions, courses (BCA, BBA, B.Com), faculty details, departments, campus environment, or contact information. What would you like to know?"
    });
  }

  const context = knowledge[intent];

  /* =====================
     GEMINI (LANGUAGE POLISH)
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
                  text: `You are a helpful college admission counselor.
Answer the user's question naturally using ONLY the information below.
Do not add new facts.

USER QUESTION:
${userMessage}

INFORMATION:
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

    return res.json({ reply: aiReply || context });

  } catch {
    return res.json({ reply: context });
  }
}
