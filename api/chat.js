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
       SCOPE CHECK — ONLY COLLEGE / STUDY QUESTIONS GO TO AI
    ===================================================== */
    function isCollegeRelated(q) {
      const collegeWords = [
        "college", "campus", "course", "courses", "degree",
        "admission", "eligibility", "study", "studies",
        "student", "faculty", "teacher", "lecturer",
        "principal", "department", "class", "syllabus",
        "exam", "semester", "notes", "placement",
        "bca", "bcom", "bba", "commerce", "computer"
      ];
      return collegeWords.some(w => q.includes(w));
    }

    /* =====================================================
       STATIC KNOWLEDGE BASE (SOURCE OF TRUTH)
    ===================================================== */
    const KB = {
      college: {
        name: "MIT First Grade College",
        city: "Mysuru",
        address:
          "Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka",
        phone: "0821 233 1722",
        email: "chandrajithmmca@mitmysore.in",
        maps:
          "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru",
        about:
          "MIT First Grade College is an undergraduate degree college in Mysuru offering Arts, Commerce, and Computer Applications programs under the University of Mysore."
      },

      courses: {
        bca: {
          title: "Bachelor of Computer Applications (BCA)",
          duration: "3 years (6 semesters)",
          eligibility:
            "+2 / PUC with Mathematics / Computer Science / Business Mathematics / Accountancy OR 3-year diploma after SSLC",
          overview:
            "BCA focuses on computer applications, programming, data structures, software development, and IT fundamentals.",
          careers:
            "Software Developer, Web Developer, System Administrator, IT Support, Higher studies (MCA, M.Sc.)"
        },

        bcom: {
          title: "Bachelor of Commerce (B.Com)",
          duration: "3 years (6 semesters)",
          eligibility:
            "PUC / 10+2 in any discipline",
          overview:
            "B.Com covers accounting, finance, taxation, business law, and management.",
          careers:
            "Accounting, Banking, Finance, MBA, M.Com, CA, CS"
        },

        bba: {
          title: "Bachelor of Business Administration (BBA)",
          duration: "3 years (6 semesters)",
          eligibility:
            "PUC / 10+2 or equivalent",
          overview:
            "BBA develops management, leadership, and entrepreneurial skills.",
          careers:
            "Management, Marketing, HR, MBA, Entrepreneurship"
        }
      },

      staff: {
        principal: {
          name: "Dr. Chandrajit Mohan",
          qualification: "MCA, Ph.D., KSET",
          experience: "15+ years",
          specialization:
            "Computer Vision, Machine Learning, MIS, Programming Languages",
          email: "chandrajithmmca@mitmysore.in"
        }
      },

      resources: {
        notes:
          "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
      }
    };

    /* =====================================================
       CONTEXT GIVEN TO AI (STRICT)
    ===================================================== */
    const collegeContextForAI = `
College Name: ${KB.college.name}
Location: ${KB.college.city}, Karnataka
Address: ${KB.college.address}
Phone: ${KB.college.phone}
Email: ${KB.college.email}

Courses:
BCA: ${KB.courses.bca.overview}
B.Com: ${KB.courses.bcom.overview}
BBA: ${KB.courses.bba.overview}

Principal:
${KB.staff.principal.name}
Qualification: ${KB.staff.principal.qualification}
Experience: ${KB.staff.principal.experience}
Specialization: ${KB.staff.principal.specialization}

RULES:
- Use ONLY the above information
- Do NOT invent facts
- If info is missing, say it is not officially available
`;

    /* =====================================================
       STATIC RESPONSES (NO AI)
    ===================================================== */

    // Greeting (only short greetings)
    if (hasAny(["hi", "hello", "hey"]) && q.length <= 5) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "You can ask about admissions, courses, eligibility, faculty, or campus life.",
        links: [
          { label: "Admissions", url: "https://mitfgc.in/admission/" },
          { label: "Courses", url: "https://mitfgc.in/courses/" }
        ]
      });
    }

    // Contact
    if (hasAny(["contact", "phone", "call", "email", "reach"])) {
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

    // Location
    if (hasAny(["location", "address", "where"])) {
      return res.json({
        reply: `📍 ${KB.college.address}`,
        links: [{ label: "Open in Google Maps", url: KB.college.maps }]
      });
    }

    // Notes
    if (hasAny(["notes", "study material", "question paper", "pdf"])) {
      return res.json({
        reply: "📚 Study materials and question papers:",
        links: [{ label: "Open Notes", url: KB.resources.notes }]
      });
    }

    // Courses
    if (hasAny(["bca"])) {
      const c = KB.courses.bca;
      return res.json({ reply: `${c.title}\n\n${c.overview}\n\nCareers: ${c.careers}` });
    }

    if (hasAny(["bcom", "commerce"])) {
      const c = KB.courses.bcom;
      return res.json({ reply: `${c.title}\n\n${c.overview}\n\nCareers: ${c.careers}` });
    }

    if (hasAny(["bba"])) {
      const c = KB.courses.bba;
      return res.json({ reply: `${c.title}\n\n${c.overview}\n\nCareers: ${c.careers}` });
    }

    // Principal
    if (hasAny(["principal"])) {
      const p = KB.staff.principal;
      return res.json({
        reply:
          `Principal: ${p.name}\n` +
          `Qualification: ${p.qualification}\n` +
          `Experience: ${p.experience}\n` +
          `Specialization: ${p.specialization}`
      });
    }

/* =====================================================
   AI FALLBACK — USE FULL COLLEGE DATA
   (ONLY WHEN STATIC RULES FAIL)
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
This information is authoritative and must be treated as the source of truth.

RULES:
- Answer ALL questions related to:
  • college details
  • courses and studies
  • faculty and teaching approach
  • safety, anti-ragging, committees
  • student life, academics, placements
- Use the information below FIRST.
- If the question is experiential (e.g. "are teachers friendly"),
  give a balanced, realistic answer based on academic practices.
- Do NOT say "information not available" if the topic is clearly related.
- Do NOT invent rankings, salaries, or guarantees.
- Keep answers human, helpful, and clear.

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
   FINAL SAFE STATIC FALLBACK
===================================================== */
return res.json({
  reply:
    "I can help with official information about MIT First Grade College such as courses, admissions, faculty, campus, and academic guidance."
});


  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return res.json({
      reply: "Something went wrong. Please try again later."
    });
  }
}


