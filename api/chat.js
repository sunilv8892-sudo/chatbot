export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    /* =====================================================
       INPUT NORMALIZATION (STRICT)
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
    // ---------------------------------------------
// Scope check: only allow AI for college/study questions
// ---------------------------------------------
function isCollegeRelated(q) {
  const collegeContextWords = [
    "college", "campus", "course", "courses", "degree",
    "admission", "eligibility", "study", "studies",
    "student", "faculty", "teacher", "lecturer",
    "principal", "department", "class", "syllabus",
    "exam", "semester", "notes", "placement",
    "bca", "bcom", "bba", "commerce", "computer"
  ];

  return collegeContextWords.some(w => q.includes(w));
}

    /* =====================================================
       STATIC KNOWLEDGE BASE (NO AI)
       → This section is intentionally verbose
       → Real data > AI guessing
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
          "MIT First Grade College is an undergraduate degree college located in Mysuru, Karnataka, offering programs in Arts, Commerce, and Computer Applications under the University of Mysore."
      },

      trust: {
        name: "Maharaja Education Trust",
        about:
          "Maharaja Education Trust was established by experienced academicians with a vision to provide quality education. The trust manages several educational institutions including schools, PU colleges, degree colleges, engineering colleges, and professional institutions."
      },

      courses: {
        bca: {
          title: "Bachelor of Computer Applications (BCA)",
          duration: "3 years (6 semesters)",
          eligibility:
            "+2 / PUC with Mathematics / Computer Science / Business Mathematics / Accountancy OR 3-year diploma after SSLC in relevant streams",
          overview:
            "BCA focuses on computer applications, programming languages, data structures, software development, and IT fundamentals.",
          careers:
            "Software Developer, Web Developer, System Administrator, IT Support, Data Analyst, Higher studies such as MCA or M.Sc."
        },

        bcom: {
          title: "Bachelor of Commerce (B.Com)",
          duration: "3 years (6 semesters)",
          eligibility:
            "PUC / 10+2 in any discipline or equivalent qualification",
          overview:
            "B.Com provides knowledge in accounting, finance, taxation, business law, and management principles.",
          careers:
            "Accountant, Banking, Finance Executive, Business Analyst, MBA, M.Com, CA, CS"
        },

        bba: {
          title: "Bachelor of Business Administration (BBA)",
          duration: "3 years (6 semesters)",
          eligibility:
            "PUC / 10+2 or equivalent examination",
          overview:
            "BBA develops managerial, leadership, and entrepreneurial skills through business-oriented subjects.",
          careers:
            "Management Trainee, Marketing Executive, HR Executive, MBA, Entrepreneurship"
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

    // ---------------------------------------------
// Context passed to AI (STRICT, NO GUESSING)
// ---------------------------------------------
const collegeContextForAI = `
College Name: ${KB.college.name}
Location: ${KB.college.city}, Karnataka
Address: ${KB.college.address}
Phone: ${KB.college.phone}
Email: ${KB.college.email}

Courses Offered:
- BCA: ${KB.courses.bca.overview}
- B.Com: ${KB.courses.bcom.overview}
- BBA: ${KB.courses.bba.overview}

Principal:
Name: ${KB.staff.principal.name}
Qualification: ${KB.staff.principal.qualification}
Experience: ${KB.staff.principal.experience}
Specialization: ${KB.staff.principal.specialization}

Rule:
Answer ONLY using the above official information.
If information is not available, say so clearly.
Do NOT invent or assume anything.
`;


    /* =====================================================
       STATIC RESPONSES (HIGH CONFIDENCE)
       → NO AI USED HERE
    ===================================================== */

    // ---- GREETINGS ----
    if (hasAny(["hi", "hello", "hey"])) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "You can ask me about admissions, courses, eligibility, campus life, staff, or contact details.",
        links: [
          { label: "Admissions", url: "https://mitfgc.in/admission/" },
          { label: "Courses", url: "https://mitfgc.in/courses/" }
        ]
      });
    }

    // ---- ABOUT COLLEGE ----
    if (hasAny(["about college", "about mit", "college details"])) {
      return res.json({
        reply:
          `${KB.college.name}, located in ${KB.college.city}, offers undergraduate programs in Arts, Commerce, and Computer Applications under the University of Mysore.\n\n` +
          KB.college.about
      });
    }

    // ---- CONTACT ----
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

    // ---- LOCATION ----
    if (hasAny(["location", "address", "where"])) {
      return res.json({
        reply: `📍 ${KB.college.address}`,
        links: [{ label: "Open in Google Maps", url: KB.college.maps }]
      });
    }

    // ---- NOTES / STUDY MATERIAL ----
    if (hasAny(["notes", "study material", "question paper", "pdf"])) {
      return res.json({
        reply: "📚 Study materials and previous question papers:",
        links: [
          {
            label: "Open Study Materials",
            url: KB.resources.notes
          }
        ]
      });
    }

    // ---- BCA ----
    if (hasAny(["bca", "computer application"])) {
      const c = KB.courses.bca;
      return res.json({
        reply:
          `🎓 ${c.title}\n\n` +
          `Duration: ${c.duration}\n` +
          `Eligibility: ${c.eligibility}\n\n` +
          `${c.overview}\n\n` +
          `Career options: ${c.careers}`
      });
    }

    // ---- BCOM ----
    if (hasAny(["bcom", "commerce"])) {
      const c = KB.courses.bcom;
      return res.json({
        reply:
          `🎓 ${c.title}\n\n` +
          `Duration: ${c.duration}\n` +
          `Eligibility: ${c.eligibility}\n\n` +
          `${c.overview}\n\n` +
          `Career options: ${c.careers}`
      });
    }

    // ---- BBA ----
    if (hasAny(["bba", "business administration"])) {
      const c = KB.courses.bba;
      return res.json({
        reply:
          `🎓 ${c.title}\n\n` +
          `Duration: ${c.duration}\n` +
          `Eligibility: ${c.eligibility}\n\n` +
          `${c.overview}\n\n` +
          `Career options: ${c.careers}`
      });
    }

    // ---- PRINCIPAL ----
    if (hasAny(["principal", "head of college"])) {
      const p = KB.staff.principal;
      return res.json({
        reply:
          `👨‍🏫 Principal: ${p.name}\n` +
          `Qualification: ${p.qualification}\n` +
          `Experience: ${p.experience}\n` +
          `Specialization: ${p.specialization}`
      });
    }

    /* =====================================================
       FALLBACK (STATIC ONLY FOR PART 1)
    ===================================================== */

  /* =====================================================
   OPINION & GENERAL QUESTIONS (CONTROLLED AI)
   → AI IS USED ONLY IF STATIC KB FAILS
===================================================== */

// Questions that SHOULD go to AI
const opinionTriggers = [
  "campus life",
  "college life",
  "is it good",
  "is this college good",
  "should i join",
  "worth joining",
  "good college",
  "student life",
  "environment",
  "experience",
  "how is life",
  "how is college",
  "placements",
  "future scope",
  "career scope"
];

const isOpinionQuestion = opinionTriggers.some(t => q.includes(t));

/* =====================================================
   AI FALLBACK — ONLY IF STATIC DATA FAILED
   AND ONLY IF QUESTION IS COLLEGE-RELATED
===================================================== */

if (isCollegeRelated(q)) {
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
          temperature: 0.5,
          messages: [
            {
              role: "system",
              content:
                "You are an official college information assistant.\n" +
                "You must NOT guess or invent details.\n" +
                "Use ONLY the provided college information.\n\n" +
                collegeContextForAI
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

    if (aiText && aiText.trim().length > 20) {
      return res.json({ reply: aiText.trim() });
    }

  } catch (err) {
    console.error("GROQ ERROR:", err);
  }
}


/* =====================================================
   SMART STATIC FALLBACK (NO AI FAILURE)
===================================================== */

return res.json({
  reply:
    "I can help with:\n\n" +
    "• Admissions and eligibility\n" +
    "• Courses like BCA, B.Com, and BBA\n" +
    "• Contact and location details\n" +
    "• Campus life and general guidance\n\n" +
    "Please ask a specific question so I can assist you better."
});


  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return res.json({
      reply: "Something went wrong. Please try again later."
    });
  }
}

return res.json({
  reply:
    "I can help with official information about MIT First Grade College such as courses, admissions, faculty, campus, and academic guidance."
});


