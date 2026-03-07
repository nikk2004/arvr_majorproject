import express from "express";
import axios from "axios";

const router = express.Router();

// ================= CLEAN TEXT =================
const cleanText = (text = "") => {
  return text
    .replace(/#{1,6}\s?/g, "")   // remove ###
    .replace(/\*\*\*/g, "")      // remove ***
    .replace(/`/g, "")           // remove backticks
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    // ✅ BETTER PROMPT (balanced)
    const finalPrompt = `
You are a friendly school teacher helping a student.

Instructions:
- Explain in simple English (8th–9th class level).
- Start with 1 short explanation line.
- Then give 3–5 points.
- Use arrow ➤ before points.
- Make important words bold using **word**.
- Avoid headings like ### or markdown symbols.
- Keep it clear but not too short.

Question: ${message}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: finalPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350, // ✅ IMPORTANT FIX
        },
      }
    );

    const data = response.data;

    let reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a proper answer.";

    reply = cleanText(reply);

    res.json({ reply });

  } catch (err) {
    console.log("Chat error:", err.response?.data || err.message);
    res.status(500).json({ reply: "AI server error" });
  }
});

export default router;