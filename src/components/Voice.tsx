"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  PlayIcon,
  RadiobuttonIcon,
  SpeakerLoudIcon,
  UpdateIcon,
  StopIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Status = "idle" | "recording" | "loading" | "ready" | "dictating";

interface Props {
  article: string;
}

export default function Voice({ article }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [conversation, setConversation] = useState<
    { role: "system" | "user" | "assistant"; content: string }[]
  >([
    {
      role: "system",
      content: `You are an AI voice companion designed to have stimulating and interesting conversations about articles. Your goal is to engage the user in a thought-provoking discussion about the content of the article, encouraging critical thinking and exploration of ideas.

Here is the article you will be discussing:

<article>
${article}
</article>

When interacting with the user, follow these guidelines:

1. Listen carefully to the user's input and respond thoughtfully, making connections to the article's content.

2. Use a friendly, conversational tone while maintaining a level of intellectual discourse appropriate for the topic.

3. Encourage the user to think critically about the article by asking follow-up questions, presenting alternative viewpoints, or highlighting interesting aspects of the topic.

4. Draw connections between the article's content and real-world applications or implications when relevant.

5. If the user expresses an opinion, acknowledge it and provide additional information or a different perspective from the article to enrich the discussion.

6. Keep your responses concise (2-4 sentences) to maintain a natural flow of conversation.

7. If the user asks a question not directly related to the article, gently guide the conversation back to the article's content.

8. Be prepared to explain or elaborate on any concepts mentioned in the article if the user requests clarification.

Remember, your goal is to have a stimulating and interesting conversation about the article. Adapt your responses based on the user's level of engagement and interest in the topic.`,
    },
  ]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const processRecording = useCallback(
    async (audioBlob: Blob) => {
      try {
        const formData = new FormData();
        formData.append("conversation", JSON.stringify(conversation));
        formData.append("file", audioBlob, "audio.mp3");

        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { audio, assistantMessage, userMessage } = await response.json();

        setConversation((prev) => [
          ...prev,
          { role: "user", content: userMessage },
          { role: "assistant", content: assistantMessage },
        ]);

        const audioBlobResponse = new Blob(
          [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
          { type: "audio/mpeg" }
        );
        const url = URL.createObjectURL(audioBlobResponse);
        setAudioUrl(url);
        setStatus("ready");
      } catch (error) {
        console.error("Failed to process recording:", error);
        setStatus("idle");
      }
    },
    [conversation]
  );

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });

      mediaRecorder.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mpeg",
        });
        audioChunksRef.current = [];
        await processRecording(audioBlob);
      });

      mediaRecorder.start();
      setStatus("recording");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }, [processRecording]);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setStatus("loading");
    }
  }, []);

  const playAudio = useCallback(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.addEventListener("ended", () => {
        setStatus("idle");
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      });
      audio
        .play()
        .then(() => setStatus("dictating"))
        .catch(console.error);
    }
  }, [audioUrl]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setStatus("idle");
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    switch (status) {
      case "idle":
        startRecording();
        break;
      case "recording":
        stopRecording();
        break;
      case "ready":
        playAudio();
        break;
      case "dictating":
        stopAudio();
        break;
      // Do nothing for "loading" state
    }
  }, [status, startRecording, stopRecording, playAudio, stopAudio]);

  useEffect(() => {
    if (status !== "recording" && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [status]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-8">
            <button
              className={cn(
                "flex size-16 items-center justify-center rounded-full text-white transition-colors",
                {
                  "bg-foreground text-background":
                    status === "idle" || status === "loading",
                  "bg-red-500": status === "recording",
                  "bg-blue-500": status === "ready" || status === "dictating",
                  "cursor-not-allowed": status === "loading",
                }
              )}
              onClick={handleButtonClick}
              disabled={status === "loading"}
            >
              {status === "idle" && (
                <RadiobuttonIcon className="block size-8" />
              )}
              {status === "recording" && <StopIcon className="size-8" />}
              {status === "loading" && (
                <UpdateIcon className="size-8 animate-spin" />
              )}
              {status === "ready" && <PlayIcon className="size-8" />}
              {status === "dictating" && <SpeakerLoudIcon className="size-8" />}
            </button>
          </div>
        </TooltipTrigger>
        {status === "idle" && (
          <TooltipContent side="left">
            <p>Tap to converse with AI</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
