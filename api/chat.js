export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    let message = "";
    if (typeof req.body === "string") message = req.body;
    else if (req.body && typeof req.body === "object") message = req.body.message || "";

    const q = message.toLowerCase().trim();
    if (!q) return res.json({ reply: "Please type your question." });

    const hasAny = (arr) => arr.some(w => q.includes(w));

    /* =========================
       🔥 HIGH PRIORITY INTENTS
    ========================= */

    // ADMISSION (FIXED + GOOD RESPONSE)
    if (hasAny(["admission", "apply", "join", "enroll"])) {
      return res.json({
        reply:
          "📝 **Admissions – MIT First Grade College**\n\n" +
          "Admissions are open and based on merit as per University of Mysore guidelines.\n\n" +
          "You can:\n" +
          "• Apply online\n" +
          "• Visit the college office\n" +
          "• Contact for counselling & fee details",
        links: [
          { label: "Apply for Admission", url: "https://mitfgc.in/admissions/" },
          { label: "Contact College", url: "https://mitfgc.in/contact-us" }
        ]
      });
    }

    // NOTES (FORCED)
    if (hasAny(["notes", "note", "pdf", "study material", "question paper"])) {
      return res.json({
        reply:
          "📚 **Study Materials & Notes**\n\n" +
          "Click below to access official notes and previous question papers.",
        links: [
          {
            label: "Open Study Materials",
            url: "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
          }
        ]
      });
    }

    // LOCATION / ADDRESS (FIXED)
    if (hasAny(["location", "address", "where", "place"])) {
      return res.json({
        reply:
          "📍 **MIT First Grade College Address**\n\n" +
          "Mananthavadi Road,\n" +
          "Vidyaranyapura,\n" +
          "Mysuru – 570008,\n" +
          "Karnataka, India",
        links: [
          {
            label: "Open in Google Maps",
            url: "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru"
          }
        ]
      });
    }

    /* =========================
       COURSES
    ========================= */

    if (hasAny(["courses", "course", "program"])) {
      return res.json({
        reply:
          "🎓 **Courses Offered**\n\n" +
          "• BCA – Computer Applications\n" +
          "• BBA – Business Administration\n" +
          "• B.Com – Commerce",
        links: [
          { label: "BCA Details", url: "https://mitfgc.in/bca" },
          { label: "BBA Details", url: "https://mitfgc.in/bba" },
          { label: "B.Com Details", url: "https://mitfgc.in/b-com" }
        ]
      });
    }

    /* =========================
       ELIGIBILITY
    ========================= */

    if (hasAny(["eligibility", "eligible", "qualification"])) {
      return res.json({
        reply:
          "✅ **Eligibility Criteria**\n\n" +
          "• BCA: 10+2 with Maths / CS / Accountancy OR relevant diploma\n" +
          "• BBA & B.Com: 10+2 in any discipline",
        links: [
          { label: "Admission Info", url: "https://mitfgc.in/admissions" }
        ]
      });
    }

    /* =========================
       CONTACT
    ========================= */

    if (hasAny(["contact", "phone", "email"])) {
      return res.json({
        reply:
          "📞 Phone: 0821 233 1722\n" +
          "📧 Email: chandrajithmmca@mitmysore.in\n" +
          "🕘 Office Hours: Mon–Sat, 9:30 AM – 4:30 PM",
        links: [
          { label: "Contact Page", url: "https://mitfgc.in/contact-us" }
        ]
      });
    }

    /* =========================
       GREETING
    ========================= */

    if (hasAny(["hi", "hello", "hey"])) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "Ask me about admissions, courses, eligibility, notes, location, or contact details.",
        links: [
          { label: "Admissions", url: "https://mitfgc.in/admissions" },
          { label: "Courses", url: "https://mitfgc.in/courses" }
        ]
      });
    }

    /* =========================
       FALLBACK (SMART)
    ========================= */

    return res.json({
      reply:
        "I can help you with:\n\n" +
        "• Admissions\n" +
        "• Courses (BCA, BBA, B.Com)\n" +
        "• Eligibility\n" +
        "• Study Materials\n" +
        "• Location & Contact",
      links: [
        { label: "Admissions", url: "https://mitfgc.in/admissions" },
        { label: "Contact College", url: "https://mitfgc.in/contact-us" }
      ]
    });

  } catch (e) {
    console.error("CHATBOT ERROR:", e);
    return res.json({
      reply: "Something went wrong internally, but the chatbot is still running."
    });
  }
}

