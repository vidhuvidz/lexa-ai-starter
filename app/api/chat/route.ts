import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}
