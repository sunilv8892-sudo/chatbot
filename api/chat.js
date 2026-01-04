import fs from "fs";
import path from "path";

const COLLEGE_CORPUS = fs.readFileSync(
  path.join(process.cwd(), "data", "college-info.txt"),
  "utf8"
);

// 👇 ADD THIS LINE HERE (TEMPORARY)
console.log("COLLEGE CORPUS LENGTH:", COLLEGE_CORPUS.length);
/* =====================================================
   MAIN HANDLER
===================================================== */
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    /* =====================================================
       INPUT NORMALIZATION
    ===================================================== */
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

    const hasAny = (arr) => arr.some(w => q.includes(w));

    /* =====================================================
       STATIC DATA (FAST & RELIABLE)
    ===================================================== */
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
        "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
    };

    /* =====================================================
       STATIC ANSWERS (DO NOT TOUCH – THESE WORK)
    ===================================================== */

    // Greeting
    if (hasAny(["hi", "hello", "hey"]) && q.length <= 6) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College AI assistant.\n\n" +
          "You can ask me about courses, admissions, safety, faculty, campus life, or academic guidance."
      });
    }

    // Contact
    if (hasAny(["contact", "phone", "call", "email"])) {
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

    // Simple course keywords
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

    /* =====================================================
       AI FALLBACK — THIS IS WHERE AI SAVES YOU
       Uses FULL college-info.txt
    ===================================================== */
    try {
      const groqRes = await fetch(
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
            messages: [
              {
                role: "system",
                content:
You are an information extraction and guidance assistant
for MIT First Grade College, Mysuru.

You are provided with OFFICIAL COLLEGE DATA below.

IMPORTANT RULES:
- If a question asks for a FACT (affiliation, trust, approval, year, codes),
  you MUST extract the exact answer from the data.
- Do NOT refuse factual questions.
- Do NOT give generic help messages for factual questions.
- If the fact exists in the data, state it clearly in one sentence.

- For opinion or guidance questions (campus life, teachers, should I join),
  answer naturally using the data as context.

COLLEGE DATA:
{{COLLEGE_CORPUS}}

              {
                role: "user",
                content: message
              }
            ]
          })
        }
      );

      const data = await groqRes.json();
      const aiText = data?.choices?.[0]?.message?.content;

if (aiText) {
  return res.json({ reply: aiText.trim() });
}


    } catch (err) {
      console.error("AI ERROR:", err);
    }

    /* =====================================================
       FINAL FALLBACK (VERY RARE)
    ===================================================== */
    return res.json({
      reply:
        "I can help with questions related to MIT First Grade College including courses, admissions, safety, faculty, and academic guidance."
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.json({
      reply: "Something went wrong. Please try again later."
    });
  }
}




