import fs from "fs";
import path from "path";

const COLLEGE_CORPUS = fs.readFileSync(
  path.join(process.cwd(), "api", "college-info.txt"),
  "utf8"
);

export default async function handler(req, res) {
  try {
    /* =====================================================
       METHOD CHECK
    ===================================================== */
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
       STATIC KNOWLEDGE (QUICK FACTS)
    ===================================================== */
    const KB = {
      college: {
        name: "MIT First Grade College",
        city: "Mysuru",
        phone: "0821 233 1722",
        email: "chandrajithmmca@mitmysore.in",
        address:
          "Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka",
        maps:
          "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru"
      }
    };

    /* =====================================================
       STATIC RESPONSES (FAST & RELIABLE)
    ===================================================== */

    if (hasAny(["hi", "hello", "hey"]) && q.length <= 5) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College AI assistant.\n\n" +
          "You can ask me anything about courses, studies, faculty, safety, admissions, or campus life."
      });
    }

    if (hasAny(["contact", "phone", "call", "email"])) {
      return res.json({
        reply:
          `📞 Phone: ${KB.college.phone}\n` +
          `📧 Email: ${KB.college.email}\n` +
          `📍 Address: ${KB.college.address}`,
        links: [
          { label: "Call College", url: `tel:${KB.college.phone}` },
          { label: "Email College", url: `mailto:${KB.college.email}` },
          { label: "Open in Google Maps", url: KB.college.maps }
        ]
      });
    }

    if (hasAny(["location", "address", "where"])) {
      return res.json({
        reply: `📍 ${KB.college.address}`,
        links: [{ label: "Open in Google Maps", url: KB.college.maps }]
      });
    }

    /* =====================================================
       AI FALLBACK — THIS IS THE BRAIN
       Uses FULL official college data
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
`You are the official AI assistant for MIT First Grade College, Mysuru.

You are provided with the COMPLETE official information of the college below.
This information must be treated as the source of truth.

RULES:
- Answer questions related to academics, courses, faculty, safety, anti-ragging,
  committees, campus life, placements, and student support.
- Use the college information below FIRST.
- If the question is experiential (example: "are teachers friendly"),
  answer in a balanced, realistic manner based on academic practices.
- Do NOT invent rankings, salaries, or guarantees.
- Do NOT refuse if the topic is clearly related to college life or studies.

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

      const data = await groqRes.json();
      const aiText = data?.choices?.[0]?.message?.content;

      if (aiText && aiText.trim().length > 10) {
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
        "I can help with questions related to MIT First Grade College including courses, studies, safety, faculty, and campus life."
    });

  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return res.json({
      reply: "Something went wrong. Please try again later."
    });
  }
}
