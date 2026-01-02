export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    /* =========================
       SAFE BODY PARSING
    ========================= */
    let message = "";
    if (typeof req.body === "string") message = req.body;
    else if (req.body && typeof req.body === "object") message = req.body.message || "";

    const q = message.toLowerCase().trim();
    if (!q) return res.json({ reply: "Please type your question." });

    const hasAny = (arr) => arr.some(w => q.includes(w));

    /* =========================
       🔒 RULE-BASED KNOWLEDGE (FIRST)
    ========================= */

    if (hasAny(["hi", "hello", "hey"])) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "You can ask me about admissions, courses, eligibility, notes, location, or general college information.",
        links: [
          { label: "Admissions", url: "https://mitfgc.in/admission/" },
          { label: "Courses", url: "https://mitfgc.in/courses/" }
        ]
      });
    }

    if (hasAny(["admission", "apply", "join"])) {
      return res.json({
        reply:
          "📝 **Admissions – MIT First Grade College**\n\n" +
          "Admissions are open and based on merit as per University of Mysore guidelines.",
        links: [
          { label: "Apply for Admission", url: "https://mitfgc.in/admission/" },
          { label: "Contact College", url: "https://mitfgc.in/contact-us/" }
        ]
      });
    }

    if (hasAny(["notes", "pdf", "study material"])) {
      return res.json({
        reply:
          "📚 Study materials and previous question papers are available below.",
        links: [
          {
            label: "Open Study Materials",
            url: "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
          }
        ]
      });
    }

    if (hasAny(["location", "address", "where"])) {
      return res.json({
        reply:
          "📍 MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka.",
        links: [
          {
            label: "Open in Google Maps",
            url: "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru"
          }
        ]
      });
    }

    if (hasAny(["is this college good", "worth joining", "safe", "parent"])) {
      return res.json({
        reply:
          "That’s a very valid question 😊\n\n" +
          "MIT First Grade College is a well-established institution in Mysuru, known for a disciplined campus, experienced faculty, and focus on academics.\n\n" +
          "It is considered a good and safe choice by students and parents.",
        links: [
          { label: "Admissions", url: "https://mitfgc.in/admission/" }
        ]
      });
    }

    /* =========================
       🤖 GEMINI AI FALLBACK (ONLY IF KB FAILS)
    ========================= */

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are an official college assistant for MIT First Grade College, Mysuru.

RULES:
- Answer politely and clearly
- Stay within college-related information
- If unsure, guide user to admissions/contact
- Do NOT hallucinate facts
- Tone should be friendly and reassuring

College info:
MIT First Grade College, Mysuru
Courses: BCA, BBA, B.Com
Admissions: https://mitfgc.in/admission/
Contact: https://mitfgc.in/contact-us/

User question:
${message}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiRes.json();
    const aiReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "For accurate information, please contact the college office.";

    return res.json({ reply: aiReply });

  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return res.json({
      reply:
        "Sorry, something went wrong. Please try again or contact the college office."
    });
  }
}
