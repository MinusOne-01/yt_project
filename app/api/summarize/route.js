import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return Response.json({ error: "Transcript missing" }, { status: 400 });
    }

    const prompt = `
      Summarize the following video transcript in 2–3 short linesin english,
      focusing on the main idea only:
      ---
      ${transcript}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful summarizer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const summary = completion.choices[0].message.content.trim();
    return Response.json({ summary });
  }
  catch(err){
    console.error("Summary API error:", err);
    return Response.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
