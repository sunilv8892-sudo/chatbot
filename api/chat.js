export default function handler(req, res) {
  try {
    /* =========================
       METHOD CHECK
    ========================= */
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    /* =========================
       SAFE BODY PARSING (VERCEL)
    ========================= */
    let message = "";

    if (typeof req.body === "string") {
      message = req.body;
    } else if (typeof req.body === "object" && req.body !== null) {
      message = req.body.message || "";
    }

    const raw = message.toLowerCase().trim();
    if (!raw) {
      return res.json({ reply: "Please type your question." });
    }

    const q = raw
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const hasAny = (arr) => arr.some((w) => q.includes(w));

    /* =========================
       GREETINGS
    ========================= */
    if (hasAny(["hi", "hello", "hey"])) {
      return res.json({
        reply:
          "Hello 👋 I’m the MIT First Grade College chatbot.\n\n" +
          "You can ask me about admissions, courses, eligibility, notes, faculty, or location.",
        links: [
          { label: "Admissions Page", url: "https://mitfgc.in/admissions" },
          { label: "Courses Page", url: "https://mitfgc.in/courses" }
        ]
      });
    }

    /* =========================
       LOCATION
    ========================= */
    if (hasAny(["location", "address", "where"])) {
      return res.json({
        reply:
          "📍 MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka.",
        links: [
          {
            label: "Open in Google Maps",
            url: "https://www.google.com/maps/search/?api=1&query=MIT+First+Grade+College+Mysuru"
          }
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
          "🕘 Office Hours: Monday–Saturday, 9:30 AM – 4:30 PM",
        links: [
          { label: "Contact Page", url: "https://mitfgc.in/contact-us" }
        ]
      });
    }

    /* =========================
       COURSES
    ========================= */
    if (hasAny(["courses", "course", "program"])) {
      return res.json({
        reply:
          "🎓 Courses Offered at MIT First Grade College:\n\n" +
          "• BCA – Bachelor of Computer Applications\n" +
          "• BBA – Bachelor of Business Administration\n" +
          "• B.Com – Bachelor of Commerce",
        links: [
          { label: "BCA Details", url: "https://mitfgc.in/bca" },
          { label: "BBA Details", url: "https://mitfgc.in/bba" },
          { label: "B.Com Details", url: "https://mitfgc.in/b-com" }
        ]
      });
    }

    /* =========================
       BCA
    ========================= */
    if (hasAny(["bca"])) {
      return res.json({
        reply:
          "🎓 BCA is a 3-year undergraduate program focused on programming and software development.",
        links: [
          { label: "BCA Curriculum", url: "https://mitfgc.in/bca" },
          { label: "Apply for BCA", url: "https://mitfgc.in/admissions" }
        ]
      });
    }

    /* =========================
       BBA
    ========================= */
    if (hasAny(["bba"])) {
      return res.json({
        reply:
          "🎓 BBA focuses on management, leadership, and entrepreneurship.",
        links: [
          { label: "BBA Program", url: "https://mitfgc.in/bba" },
          { label: "Apply for BBA", url: "https://mitfgc.in/admissions" }
        ]
      });
    }

    /* =========================
       B.COM
    ========================= */
    if (hasAny(["bcom", "b.com"])) {
      return res.json({
        reply:
          "🎓 B.Com focuses on accounting, finance, and taxation.",
        links: [
          { label: "B.Com Program", url: "https://mitfgc.in/b-com" },
          { label: "Apply for B.Com", url: "https://mitfgc.in/admissions" }
        ]
      });
    }

    /* =========================
       ELIGIBILITY
    ========================= */
    if (hasAny(["eligibility", "eligible", "qualification"])) {
      return res.json({
        reply:
          "✅ Eligibility:\n\n" +
          "• BCA: 10+2 with Maths / CS / Accountancy OR relevant diploma\n" +
          "• BBA & B.Com: 10+2 in any discipline",
        links: [
          { label: "Admissions Info", url: "https://mitfgc.in/admissions" }
        ]
      });
    }

    /* =========================
       ADMISSIONS
    ========================= */
    if (hasAny(["admission", "apply", "join"])) {
      return res.json({
        reply:
          "📝 Admissions at MIT First Grade College are based on merit and University of Mysore guidelines.",
        links: [
          { label: "Apply Now", url: "https://mitfgc.in/admissions" },
          { label: "Contact Office", url: "https://mitfgc.in/contact-us" }
        ]
      });
    }

    /* =========================
       NOTES
    ========================= */
    if (hasAny(["notes", "pdf", "study material"])) {
      return res.json({
        reply:
          "📚 Study materials and previous question papers are available below.",
        links: [
          {
            label: "Open Study Materials",
            url: "https://drive.google.com/drive/folders/1bTRaNQdcS5d9Bdxwzi9s5_R8QJZSZvRD"
          }
        ]
      });
    }

    /* =========================
       FEES
    ========================= */
    if (hasAny(["fees", "fee structure"])) {
      return res.json({
        reply:
          "💰 Fee structure varies by course and university norms.",
        links: [
          { label: "Contact for Fees", url: "https://mitfgc.in/contact-us" }
        ]
      });
    }

    /* =========================
       FALLBACK
    ========================= */
    return res.json({
      reply:
        "I can help with admissions, courses, eligibility, notes, faculty, location, and contact details.",
      links: [
        { label: "Admissions", url: "https://mitfgc.in/admissions" },
        { label: "Courses", url: "https://mitfgc.in/courses" }
      ]
    });

  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return res.json({
      reply: "Something went wrong internally, but the chatbot is still alive."
    });
  }
}
