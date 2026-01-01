import fetch from "node-fetch";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const knowledge = {
  contact: {
    text: `📞 Phone: 0821 233 1722
📧 Email: chandrajithmmca@mitmysore.in
📍 Address: Mananthavadi Road, Vidyaranyapura, Mysuru – 570008
🕘 Office Hours: Monday to Saturday, 9:30 AM – 4:30 PM`,
  },
  admissions: {
    text: `📝 Admissions at MIT First Grade College

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
    text: `🎓 Courses Offered
• BCA – Bachelor of Computer Applications
• BBA – Bachelor of Business Administration
• B.Com – Bachelor of Commerce

All programs are undergraduate and of 3 years (6 semesters).`,
  },
  bca: {
    text: `🎓 BCA (Bachelor of Computer Applications)

A 3-year undergraduate program focused on programming, software development, problem-solving, and computer applications.

Career paths include IT jobs, MCA, and M.Sc Computer Science.`,
  },
  faculty: {
    text: `👨‍🏫 Faculty & Academic Leadership

Principal: Dr. Chandrajit Mohan (MCA, Ph.D)
• 15 years teaching experience
• 3 years industry experience
• 12 years research experience
• 25 publications, 3 textbooks, 2 patents

The college has experienced faculty across Computer Science, Commerce, Management, and English departments.`,
  },
  departments: {
    text: `🏫 Academic Departments
• Computer Science (BCA)
• Commerce (B.Com)
• Management Studies (BBA)
• English (common to all programs)`,
  },
  environment: {
    text: `🏫 Campus Environment

The college provides a disciplined, safe, and student-friendly environment with academic focus, mentoring, and parental assurance.`,
  },
  resources: {
    text: `📚 Study Resources

Students are provided with e-resources, previous question papers, and academic guidance through official college channels and faculty support.`,
  },
};

// ---------- Helpers ----------
function detectIntentFallback(q) {
  const text = q.toLowerCase();
  if (text.match(/mail|email|phone|call|reach|address/)) return ["contact"];
  if (text.match(/admis|join|apply|enrol|enroll|interest/)) return ["admissions"];
  if (text.match(/bca|computer/)) return ["bca"];
  if (text.match(/course|degree|program/)) return ["courses"];
  if (text.match(/faculty|teacher|staff|principal/)) return ["faculty"];
  if (text.match(/dept|department|stream/)) return ["departments"];
  if (text.match(/safe|parent|environment|campus/)) return ["environment"];
  if (text.match(/note|pdf|material|resource/)) return ["resources"];
  return [];
}

async function callGemini(apiKey, prompt) {
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

function parseIntentLabels(raw) {
  if (!raw || raw.toLowerCase().trim() === "unknown") return [];
  return raw
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter((label) => knowledge[label]);
}

// ---------- Main handler ----------
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed. Use POST only." });
  }

  const userMessage = (req.body?.message || "").trim();
  if (!userMessage) {
    return res.status(400).json({ reply: "Please type your question." });
  }

  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) {
    return res.status(500).json({ reply: "Server error: Missing API key." });
  }

  // STEP 1: AI intent detection
  let intents = [];
  try {
    const intentPrompt = `Classify into ONE OR TWO labels: contact, admissions, courses, bca, faculty, departments, environment, resources, unknown

User: "${userMessage}"

Rules: contact=email/phone; resources=notes; admissions=apply; ONLY labels comma-separated.`;
    const intentRaw = await callGemini(apiKey, intentPrompt);
    intents = parseIntentLabels(intentRaw);
  } catch {}

  // STEP 2: Fallback matching
  if (intents.length === 0) {
    intents = detectIntentFallback(userMessage);
  }

  if (intents.length === 0) {
    // ⭐ NEW: SMART LLM FALLBACK ⭐
    try {
      const allKnowledge = Object.values(knowledge).map((k) => k.text).join("\n\n");
      const fallbackPrompt = `You are MIT First Grade College counselor (Mysuru).

User: "${userMessage}"

College info:
${allKnowledge}

For quality/rankings: "Mixed reviews (3.7/5). Strong faculty & discipline, modest placements ₹2.5-4.5LPA. Visit to decide!"

Answer politely using ONLY above info. End with contact/admissions offer.`;
      const smartReply = await callGemini(apiKey, fallbackPrompt);
      return res.json({ reply: smartReply });
    } catch {
      // Static fallback
      return res.json({
        reply: "I want to help! Ask about admissions, courses, faculty, or contact. Rephrase?",
      });
    }
  }

  // STEP 3: Specific reply
  const mergedText = intents.map((intent) => knowledge[intent].text).join("\n\n");

  try {
    const answerPrompt = `Polite college counselor. Use ONLY this info.

User: "${userMessage}"

Info:
${mergedText}`;
    const reply = await callGemini(apiKey, answerPrompt);
    return res.json({ reply: reply || mergedText });
  } catch {
    return res.json({ reply: mergedText });
  }
}
