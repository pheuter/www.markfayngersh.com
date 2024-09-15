import OpenAI from "openai";
import { openai as openaiModel } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = new OpenAI();

export const maxDuration = 60;

export async function POST(req: Request) {
  const formData = await req.formData();
  const conversation = JSON.parse(formData.get("conversation") as string);
  const userAudio = formData.get("file") as File;

  // Transcribe the user's audio input
  const transcription = await openai.audio.transcriptions.create({
    file: userAudio,
    model: "whisper-1",
  });

  // Update the conversation with the user's new message
  conversation.push({
    role: "user",
    content: transcription.text,
  });

  // Generate the assistant's response
  const result = await generateText({
    model: openaiModel("gpt-4o-mini"),
    messages: conversation,
  });

  // Update the conversation with the assistant's response
  conversation.push({
    role: "assistant",
    content: result.text,
  });

  // Generate the speech audio for the assistant's response
  const responseAudio = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    speed: 1,
    response_format: "mp3",
    input: result.text,
  });

  // Convert audio to base64 to send in JSON response
  const audioBuffer = await responseAudio.arrayBuffer();
  const audioBase64 = Buffer.from(audioBuffer).toString("base64");

  return new Response(
    JSON.stringify({
      audio: audioBase64,
      assistantMessage: result.text,
      userMessage: transcription.text,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
