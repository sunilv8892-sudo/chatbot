// ======================================================
// MIT FGC CHATBOT — AI BACKEND
// FILE: /api/chat.js
// ======================================================

import fs from "fs";
import path from "path";

// ======================================================
// LOAD COLLEGE KNOWLEDGE (SINGLE SOURCE OF TRUTH)
// ======================================================

const COLLEGE_INFO_PATH = path.join(
  process.cwd(),
  "data",
  "college-info.txt"
);

let COLLEGE_CORPUS = "";

try {
  COLLEGE_CORPUS = fs.readFileSync(COLLEGE_INFO_PATH, "utf8");
  console.log("COLLEGE INFO LOADED, LENGTH:", COLLEGE_CORPUS.length);
} catch (err) {
  console.error("FAILED TO LOAD college-info.txt", err);
}

// ======================================================
// GROQ CONFIG
// ======================================================

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

// ======================================================
// MAIN HANDLER
// ======================================================

export default async function handler(req, res) {
  try {
    // ----------------------------------------------
    // METHOD CHECK
    // ----------------------------------------------
    if (req.method !== "POST") {
      return res.status(405).json({
        reply: "Method not allowed"
      });
    }

    // ----------------------------------------------
    // INPUT PARSING (STRICT, SAFE)
    // ----------------------------------------------
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

    const userMessage = String(body.message || "").trim();
    const userLang = String(body.language || "en").trim();

    if (!userMessage) {
      return res.json({
        reply: "Please type your question."
      });
    }

    // ----------------------------------------------
    // BUILD SYSTEM PROMPT (VERY IMPORTANT)
    // ----------------------------------------------

    const systemPrompt = `
You are an intelligent, helpful, and calm AI assistant for:

MIT First Grade College, Mysuru, Karnataka, India.

You are given OFFICIAL COLLEGE INFORMATION below.
This information is your ONLY factual source.

YOUR RESPONSIBILITIES:
1. Understand the user's question, even with spelling mistakes.
2. If the question is NOT in English, translate it to English internally.
3. Answer clearly and honestly using the college information.
4. If the question is opinion-based (e.g. "is this college good"),
   give a balanced, realistic, student-guidance style answer.
5. If the question is about studies, courses, admissions, safety,
   affiliation, faculty, campus life, or student support — ANSWER IT.
6. If exact data is missing, say so politely WITHOUT refusing.
7. NEVER say:
   - "I can help with..."
   - "Please ask a specific question"
   - "Information not available" (unless truly unavoidable)
8. DO NOT invent rankings, placement salaries, or guarantees.
9. AFTER generating the answer in English,
   translate the FINAL answer into the user's preferred language:
   Language code: ${userLang}

COLLEGE INFORMATION (AUTHORITATIVE):
-----------------------------------
${COLLEGE_CORPUS}
-----------------------------------

IMPORTANT:
Return ONLY the final translated answer.
Do NOT include explanations of translation.
Do NOT mention internal steps.
`;

    // ----------------------------------------------
    // CALL GROQ
    // ----------------------------------------------

    const groqResponse = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    // ----------------------------------------------
    // HANDLE GROQ RESPONSE
    // ----------------------------------------------

    const rawText = await groqResponse.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("GROQ RAW (INVALID JSON):", rawText);
      return res.json({
        reply: "AI response error. Please try again."
      });
    }

    const aiReply =
      data?.choices?.[0]?.message?.content?.trim();

    if (!aiReply) {
      console.error("EMPTY AI RESPONSE:", data);
      return res.json({
        reply:
          "I’m sorry, I couldn’t generate a response right now. Please try again."
      });
    }

    // ----------------------------------------------
    // SUCCESS
    // ----------------------------------------------

    return res.json({
      reply: aiReply
    });

  } catch (error) {
    console.error("CHAT API ERROR:", error);
    return res.json({
      reply:
        "Something went wrong while processing your request. Please try again."
    });
  }
}
