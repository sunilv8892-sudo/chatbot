import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

/* ===============================
   COLLEGE KNOWLEDGE
   =============================== */
const COLLEGE_INFO = `
MIT First Grade College (MIT FGC)

Location:
Vidyaranyapura, Mysuru, Karnataka, India.

Address:
Mananthavadi Road, Vidyaranyapura, Mysuru – 570008.

Established:
2009.

Management:
Maharaja Education Trust.

Courses:
BCA, BBA, B.Com (UG)
M.Com (PG)

Admissions:
Admissions are based on merit and University of Mysore guidelines.

Fees:
Fee structure is as per University norms.
For exact details, contact the college office.

Contact:
Phone: 0821 233 1722
Website: https://mitfgc.in
`;

/* ===============================
   CHAT API
   =============================== */
app.post("/chat", async (req, res) => {
  const q = req.body.message.toLowerCase();

  /* ---- GREETINGS ---- */
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey"
  ) {
    return res.json({
      reply: "Hello 👋 I’m the MIT FGC chatbot. Ask me about courses, admissions, fees, or location."
    });
  }

  /* ---- STATIC GUARANTEED ANSWERS ---- */
  if (q.includes("location") || q.includes("address") || q.includes("where")) {
    return res.json({
      reply:
        "MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka."
    });
  }

  if (q.includes("course")) {
    return res.json({
      reply:
        "MIT FGC offers BCA, BBA, and B.Com at undergraduate level and M.Com at postgraduate level."
    });
  }

  if (q.includes("admission")) {
    return res.json({
      reply:
        "Admissions at MIT FGC are based on merit and University of Mysore guidelines. Please contact the college office for details."
    });
  }

  if (q.includes("fee")) {
    return res.json({
      reply:
        "The fee structure follows University norms. For exact fees, please contact the college office."
    });
  }

  if (q.includes("contact") || q.includes("phone")) {
    return res.json({
      reply:
        "You can contact MIT FGC at 0821 233 1722 or visit https://mitfgc.in"
    });
  }

  /* ---- GEMINI AI FALLBACK ---- */
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
You are a college chatbot.
Answer ONLY using the information below.
If the answer is not present, say "Sorry, I don't have that information."

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
      reply: "AI service is currently unavailable."
    });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
