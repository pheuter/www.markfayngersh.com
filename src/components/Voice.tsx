"use client";

import { useState, useRef, useEffect } from "react";
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
import { getVoiceSystemPrompt } from "@/lib/voiceSystemPrompt";

type Status = "idle" | "recording" | "loading" | "ready" | "dictating";

interface Props {
  article: string;
}

export default function Voice({ article }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [conversation, setConversation] = useState([
    { role: "system" as const, content: getVoiceSystemPrompt(article) },
  ]);
  
  const recorder = useRef<{
    mediaRecorder: MediaRecorder | null;
    stream: MediaStream | null;
    chunks: Blob[];
  }>({ mediaRecorder: null, stream: null, chunks: [] });
  
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (recorder.current.stream) {
        recorder.current.stream.getTracks().forEach(track => track.stop());
      }
      if (audio.current) {
        audio.current.pause();
        URL.revokeObjectURL(audio.current.src);
      }
    };
  }, []);

  async function handleButtonClick() {
    switch (status) {
      case "idle":
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          recorder.current.stream = stream;
          recorder.current.mediaRecorder = new MediaRecorder(stream);
          recorder.current.chunks = [];

          recorder.current.mediaRecorder.ondataavailable = (e) => {
            recorder.current.chunks.push(e.data);
          };

          recorder.current.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(recorder.current.chunks, { type: "audio/mpeg" });
            await processRecording(audioBlob);
          };

          recorder.current.mediaRecorder.start();
          setStatus("recording");
        } catch (error) {
          console.error("Failed to start recording:", error);
        }
        break;

      case "recording":
        if (recorder.current.mediaRecorder?.state === "recording") {
          recorder.current.mediaRecorder.stop();
          recorder.current.stream?.getTracks().forEach(track => track.stop());
          setStatus("loading");
        }
        break;

      case "ready":
        if (audio.current) {
          audio.current.play()
            .then(() => setStatus("dictating"))
            .catch(console.error);
        }
        break;

      case "dictating":
        if (audio.current) {
          audio.current.pause();
          audio.current.currentTime = 0;
          setStatus("idle");
        }
        break;
    }
  }

  async function processRecording(audioBlob: Blob) {
    try {
      const formData = new FormData();
      formData.append("conversation", JSON.stringify(conversation));
      formData.append("file", audioBlob, "audio.mp3");

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const { audio: audioBase64, assistantMessage, userMessage } = await response.json();

      setConversation(prev => [
        ...prev,
        { role: "user" as const, content: userMessage },
        { role: "assistant" as const, content: assistantMessage },
      ]);

      const audioData = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
      const audioBlobResponse = new Blob([audioData], { type: "audio/mpeg" });
      
      if (audio.current) {
        URL.revokeObjectURL(audio.current.src);
      }
      
      audio.current = new Audio(URL.createObjectURL(audioBlobResponse));
      audio.current.onended = () => {
        setStatus("idle");
        if (audio.current) {
          URL.revokeObjectURL(audio.current.src);
          audio.current = null;
        }
      };
      
      setStatus("ready");
    } catch (error) {
      console.error("Failed to process recording:", error);
      setStatus("idle");
    }
  }

  const buttonStyle = cn(
    "flex size-16 items-center justify-center rounded-full text-white transition-colors",
    {
      "bg-foreground text-background": status === "idle" || status === "loading",
      "bg-red-500": status === "recording",
      "bg-blue-500": status === "ready" || status === "dictating",
      "cursor-not-allowed": status === "loading",
    }
  );

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-8">
            <button
              className={buttonStyle}
              onClick={handleButtonClick}
              disabled={status === "loading"}
            >
              {status === "idle" && <RadiobuttonIcon className="block size-8" />}
              {status === "recording" && <StopIcon className="size-8" />}
              {status === "loading" && <UpdateIcon className="size-8 animate-spin" />}
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
