// ==============================
// PART 1 / 4
// api/chat.js
// ==============================

import fs from "fs";
import path from "path";

// ==============================
// LOAD COLLEGE INFO (SINGLE SOURCE OF TRUTH)
// ==============================
const COLLEGE_CORPUS = fs.readFileSync(
  path.join(process.cwd(), "data", "college-info.txt"),
  "utf8"
);

// ==============================
// MAIN HANDLER
// ==============================
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    // ==============================
    // INPUT NORMALIZATION
    // ==============================
    const message =
      typeof req.body === "string"
        ? req.body
        : req.body?.message || "";

    const q = message
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!q) {
      return res.json({ reply: "Please type your question." });
    }

    const hasAny = (arr) => arr.some((w) => q.includes(w));

    // ==============================
    // CORE STATIC DATA (FAST FACTS)
    // ==============================
    const COLLEGE = {
      name: "MIT First Grade College",
      city: "Mysuru",
      address:
        "Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka",
      phone: "0821 233 1722",
      email: "chandrajithmmca@mitmysore.in",
      maps:
        "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru",
      notes:
        "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD",
      admission: "https://mitfgc.in/admission/",
      courses: "https://mitfgc.in/courses/"
    };

    // ==============================
    // STATIC RESPONSES (HIGH CONFIDENCE)
    // ==============================

    // Greetings
    if (hasAny(["hi", "hello", "hey"]) && q.length <= 6) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "You can ask me about admissions, courses, faculty, safety, campus life, or academic guidance.",
        links: [
          { label: "Admissions", url: COLLEGE.admission },
          { label: "Courses", url: COLLEGE.courses }
        ]
      });
    }

    // Contact
    if (hasAny(["contact", "phone", "call", "email", "reach"])) {
      return res.json({
        reply:
          `📞 Phone: ${COLLEGE.phone}\n` +
          `📧 Email: ${COLLEGE.email}\n` +
          `📍 Address: ${COLLEGE.address}`,
        links: [
          { label: "Call College", url: `tel:${COLLEGE.phone}` },
          { label: "Email College", url: `mailto:${COLLEGE.email}` },
          { label: "Open in Google Maps", url: COLLEGE.maps }
        ]
      });
    }

    // Location
    if (hasAny(["location", "address", "where"])) {
      return res.json({
        reply: `📍 ${COLLEGE.address}`,
        links: [{ label: "Open in Google Maps", url: COLLEGE.maps }]
      });
    }

    // Notes
    if (hasAny(["notes", "study material", "question paper", "pdf"])) {
      return res.json({
        reply: "📚 Study materials and question papers:",
        links: [{ label: "Open Notes", url: COLLEGE.notes }]
      });
    }

    // Admissions
    if (hasAny(["admission", "apply", "join"])) {
      return res.json({
        reply:
          "📝 Admissions at MIT First Grade College are based on merit as per University of Mysore guidelines.",
        links: [{ label: "Apply for Admission", url: COLLEGE.admission }]
      });
    }

    // University affiliation (PINNED FACT)
    if (hasAny(["university", "affiliated", "affiliation"])) {
      return res.json({
        reply:
          "MIT First Grade College is affiliated to the University of Mysore."
      });
    }

    // Trust
    if (hasAny(["trust", "management"])) {
      return res.json({
        reply:
          "MIT First Grade College is managed by Maharaja Education Trust (R), Mysuru."
      });
    }

    // Courses basic
    if (hasAny(["bca"])) {
      return res.json({
        reply:
          "🎓 BCA (Bachelor of Computer Applications)\n\n" +
          "A 3-year undergraduate program focused on programming, software development, and IT fundamentals."
      });
    }

    if (hasAny(["bcom", "commerce"])) {
      return res.json({
        reply:
          "🎓 B.Com (Bachelor of Commerce)\n\n" +
          "Focuses on accounting, finance, taxation, and business management."
      });
    }

    if (hasAny(["bba"])) {
      return res.json({
        reply:
          "🎓 BBA (Bachelor of Business Administration)\n\n" +
          "Develops management, leadership, and entrepreneurial skills."
      });
    }

    // ==============================
    // CONTINUE IN PART 2
    // ==============================

// ==============================
// PART 2 / 4
// CONTINUATION OF api/chat.js
// ==============================

    // ==============================
    // SAFETY, DISCIPLINE, STUDENT SUPPORT (STATIC + AI ASSIST)
    // ==============================

    if (hasAny(["anti ragging", "ragging", "safety", "safe", "harassment"])) {
      return res.json({
        reply:
          "MIT First Grade College has an Anti-Ragging Cell and student welfare committees to ensure a safe and disciplined campus environment. Ragging is strictly prohibited as per UGC norms."
      });
    }

    if (hasAny(["grievance", "complaint", "problem", "issue"])) {
      return res.json({
        reply:
          "The college has a Grievance Redressal mechanism to address academic and administrative concerns of students."
      });
    }

    if (hasAny(["faculty", "teachers", "lecturers", "staff"])) {
      return res.json({
        reply:
          "MIT First Grade College has qualified and experienced faculty members. Many faculty hold postgraduate and doctoral degrees and focus on academic mentoring and student development."
      });
    }

    if (hasAny(["principal", "head of college"])) {
      return res.json({
        reply:
          "The college is headed by an experienced principal with strong academic and administrative background."
      });
    }

    if (hasAny(["library", "books", "reading"])) {
      return res.json({
        reply:
          "The college library provides access to textbooks, reference books, journals, and e-resources to support academic learning."
      });
    }

    if (hasAny(["placement", "job", "career", "future"])) {
      return res.json({
        reply:
          "The college provides placement assistance, career guidance, and skill development programs to help students prepare for employment or higher studies."
      });
    }

    if (hasAny(["campus life", "college life", "environment"])) {
      return res.json({
        reply:
          "Campus life at MIT First Grade College focuses on academics, co-curricular activities, student engagement programs, and overall personal development."
      });
    }

    if (hasAny(["sports", "games", "physical"])) {
      return res.json({
        reply:
          "The college encourages student participation in sports and physical activities as part of holistic development."
      });
    }

    if (hasAny(["nss", "social service", "community"])) {
      return res.json({
        reply:
          "The college promotes social responsibility through NSS and community engagement activities."
      });
    }

    // ==============================
    // COURSE SELECTION GUIDANCE (STATIC LOGIC)
    // ==============================

    if (hasAny(["which course", "what course", "course should i choose"])) {
      return res.json({
        reply:
          "Choosing a course depends on your interests and career goals:\n\n" +
          "• Choose BCA if you are interested in computers and IT\n" +
          "• Choose B.Com if you are interested in finance, accounting, or business\n" +
          "• Choose BBA if you are interested in management and leadership roles"
      });
    }

    // ==============================
    // CONTINUE IN PART 3
    // ==============================
// ==============================
// PART 3 / 4
// AI ENGINE (ROBUST)
// ==============================

/* ===============================
   AI RESPONSE (FIXED & STABLE)
================================ */

let aiReply = null;

try {
  const aiRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content: `
You are the official AI assistant for MIT First Grade College, Mysuru.

You KNOW everything about the college from the data below.
You MUST answer the user's question.

Rules:
- Answer even if the question has spelling mistakes.
- Answer short factual questions clearly.
- Answer opinion questions in a balanced, helpful way.
- NEVER say "I can help with" or refuse.
- NEVER stay silent.

COLLEGE INFORMATION:
${COLLEGE_CORPUS}
`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    }
  );

  const data = await aiRes.json();
  aiReply = data?.choices?.[0]?.message?.content?.trim();

} catch (e) {
  console.error("AI ERROR:", e);
}

/* ===============================
   FINAL RETURN (NO APOLOGY)
================================ */

if (aiReply) {
  return res.json({ reply: aiReply });
}

// absolute last fallback (never looks broken)
return res.json({
  reply:
    "MIT First Grade College is affiliated with the University of Mysore and offers undergraduate programs with focus on academics, student safety, and overall development."
});




