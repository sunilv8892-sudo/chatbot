export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    // ---- parse message safely ----
    let message = "";
    if (typeof req.body === "string") message = req.body;
    else if (req.body && typeof req.body === "object") message = req.body.message || "";

    const q = message.toLowerCase().trim();
    if (!q) return res.json({ reply: "Please type your question." });

    const hasAny = (arr) => arr.some(w => q.includes(w));

    // ---- RULE BASED (FACTS & LINKS) ----
    if (hasAny(["admission", "apply"])) {
      return res.json({
        reply:
          "📝 **Admissions – MIT First Grade College**\n\n" +
          "Admissions are based on merit as per University of Mysore guidelines.",
        links: [
          { label: "Apply for Admission", url: "https://mitfgc.in/admission/" },
          { label: "Contact College", url: "https://mitfgc.in/contact-us/" }
        ]
      });
    }

    if (hasAny(["notes", "pdf", "study material"])) {
      return res.json({
        reply: "📚 Study materials and previous question papers:",
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
          "📍 MIT First Grade College, Mananthavadi Road, Vidyaranyapura, Mysuru – 570008.",
        links: [
          {
            label: "Open in Google Maps",
            url: "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru"
          }
        ]
      });
    }

    if (hasAny(["hi", "hello", "hey"])) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "You can ask me about admissions, courses, campus life, or anything you want to know.",
        links: [
          { label: "Admissions", url: "https://mitfgc.in/admission/" },
          { label: "Courses", url: "https://mitfgc.in/courses/" }
        ]
      });
    }

    // ---- AI (GROQ) FOR OPINIONS / GENERAL QUESTIONS ----
   const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
  },
  body: JSON.stringify({
    model: "llama3-8b-8192", // ✅ guaranteed free-tier model
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful, honest college assistant for MIT First Grade College, Mysuru. " +
          "Answer naturally like a human. Do not invent facts."
      },
      {
        role: "user",
        content: message
      }
    ]
  })
});

// 🔴 LOG EVERYTHING
const raw = await groqRes.text();
console.log("GROQ STATUS:", groqRes.status);
console.log("GROQ RAW:", raw);

// try parse
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  return res.json({
    reply: "Groq returned an invalid response."
  });
}

const aiText = data?.choices?.[0]?.message?.content;

if (!aiText) {
  return res.json({
    reply: "Groq did not return an answer. Check function logs."
  });
}

return res.json({ reply: aiText.trim() });


  } catch (err) {
    console.error("GROQ ERROR:", err);
    return res.json({
      reply: "Something went wrong. Please try again in a moment."
    });
  }
}

