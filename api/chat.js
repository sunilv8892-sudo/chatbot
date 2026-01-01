import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const q = req.body.message.toLowerCase();

  /* =========================
     GREETINGS
  ========================= */
  if (["hi", "hello", "hey"].includes(q)) {
    return res.json({
      reply:
        "Hello 👋 I’m the MIT FGC virtual assistant. You can ask me about admissions, fees, courses, exams, hostel, or placements."
    });
  }

  /* =========================
     ADMISSIONS
  ========================= */
  if (q.includes("course")) {
    return res.json({
      reply:
        "MIT First Grade College offers BCA, BBA, and B.Com at the undergraduate level, and M.Com at the postgraduate level."
    });
  }

  if (q.includes("eligibility")) {
    return res.json({
      reply:
        "Eligibility depends on the course. Undergraduate programs require completion of 10+2, and postgraduate programs require a relevant bachelor’s degree."
    });
  }

  if (q.includes("apply") || q.includes("admission process")) {
    return res.json({
      reply:
        "You can apply for admission by visiting the college office or through the official website https://mitfgc.in."
    });
  }

  if (q.includes("last date")) {
    return res.json({
      reply:
        "Admission deadlines are announced by the college each academic year. Please contact the admissions office for the latest dates."
    });
  }

  if (q.includes("documents")) {
    return res.json({
      reply:
        "Required documents usually include mark cards, transfer certificate, ID proof, and passport-size photographs."
    });
  }

  if (q.includes("entrance")) {
    return res.json({
      reply:
        "There is no separate entrance exam. Admissions are generally based on merit and University of Mysore guidelines."
    });
  }

  /* =========================
     FEES & SCHOLARSHIPS
  ========================= */
  if (q.includes("fee")) {
    return res.json({
      reply:
        "The fee structure varies by course and follows university norms. Please contact the college office for exact fee details."
    });
  }

  if (q.includes("scholarship")) {
    return res.json({
      reply:
        "Scholarships may be available as per government and institutional norms. Students can inquire at the college office for eligibility and application details."
    });
  }

  if (q.includes("installment") || q.includes("emi")) {
    return res.json({
      reply:
        "Fee installment options may be available depending on college policy. Please contact the administration for confirmation."
    });
  }

  if (q.includes("refund")) {
    return res.json({
      reply:
        "Fee refunds are subject to college and university rules. Contact the administration office for the refund policy."
    });
  }

  /* =========================
     ACADEMICS
  ========================= */
  if (q.includes("duration")) {
    return res.json({
      reply:
        "Undergraduate programs are typically 3 years long. Postgraduate programs are usually 2 years."
    });
  }

  if (q.includes("attendance")) {
    return res.json({
      reply:
        "Attendance is calculated as per University of Mysore regulations. Regular attendance is mandatory."
    });
  }

  if (q.includes("grading")) {
    return res.json({
      reply:
        "The grading system follows the University of Mysore evaluation guidelines."
    });
  }

  /* =========================
     EXAMS & RESULTS
  ========================= */
  if (q.includes("exam")) {
    return res.json({
      reply:
        "Examinations are conducted as per the University of Mysore academic calendar."
    });
  }

  if (q.includes("result")) {
    return res.json({
      reply:
        "Exam results are published by the University of Mysore and communicated through the college."
    });
  }

  if (q.includes("revaluation") || q.includes("re-exam")) {
    return res.json({
      reply:
        "Revaluation and supplementary exams are conducted according to university rules."
    });
  }

  /* =========================
     CAMPUS & FACILITIES
  ========================= */
  if (q.includes("hostel")) {
    return res.json({
      reply:
        "Hostel facilities may be available. Students should contact the college for details regarding accommodation and fees."
    });
  }

  if (q.includes("library") || q.includes("lab")) {
    return res.json({
      reply:
        "The campus includes a library, computer labs, and other academic facilities to support student learning."
    });
  }

  /* =========================
     PLACEMENTS & CAREERS
  ========================= */
  if (q.includes("placement")) {
    return res.json({
      reply:
        "MIT FGC provides placement assistance and career guidance through its placement cell."
    });
  }

  if (q.includes("internship")) {
    return res.json({
      reply:
        "Internship opportunities may be available depending on the course and industry tie-ups."
    });
  }

  /* =========================
     CONTACT & LOCATION
  ========================= */
  if (q.includes("location") || q.includes("address") || q.includes("where")) {
    return res.json({
      reply:
        "MIT First Grade College is located at Mananthavadi Road, Vidyaranyapura, Mysuru – 570008, Karnataka, India."
    });
  }

  if (q.includes("contact") || q.includes("phone")) {
    return res.json({
      reply:
        "You can contact MIT First Grade College at 0821 233 1722 or visit https://mitfgc.in."
    });
  }

  /* =========================
     FALLBACK
  ========================= */
  return res.json({
    reply:
      "Sorry, I don’t have that information right now. Please contact the college office or visit https://mitfgc.in."
  });
}
