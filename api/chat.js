import fetch from "node-fetch";

const COLLEGE_INFO = `
MIT First Grade College (MIT FGC)

Location:
Vidyaranyapura, Mysuru, Karnataka, India.

Address:
Mananthavadi Road, Vidyaranyapura, Mysuru – 570008.

Courses:
BCA, BBA, B.Com (UG)
M.Com (PG)

Admissions:
Based on merit and University of Mysore guidelines.

Contact:
Phone: 0821 233 1722
Website: https://mitfgc.in
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const q = req.body.message.toLowerCase();

  // ---- STATIC RESPONSES ----
  if (q.includes("hi") || q.includes("hello")) {
    return res.json({
      reply: "Hello 👋 I’m the MIT FGC chatbot. How can I help you?"
    });
  }

  if (q.includes("location") || q.includes("address") || q.includes("where")) {
    return res.json({
      reply:
        "MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka."
    });
  }

  if (q.includes("course")) {
    return res.json({
      reply:
        "MIT FGC offers BCA, BBA, and B.Com (UG) and M.Com (PG)."
    });
  }

  // ---- GEMINI FALLBACK ----
  try {
    const response = await fetch(
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
Answer ONLY using the information below.
If not found, say you don't have the info.

${COLLEGE_INFO}

Question: ${q}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I don't have that information.";

    return res.json({ reply });

  } catch {
    return res.json({
      reply: "AI service unavailable."
    });
  }
}
