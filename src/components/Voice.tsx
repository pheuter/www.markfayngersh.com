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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
  }, []);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setStatus("loading");
    }
  }, []);

  const processRecording = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("article", article);
      formData.append("file", audioBlob, "audio.mp3");

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseAudioBlob = await response.blob();
      const url = URL.createObjectURL(responseAudioBlob);
      setAudioUrl(url);
      setStatus("ready");
    } catch (error) {
      console.error("Failed to process recording:", error);
      setStatus("idle");
    }
  };

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
                "flex items-center justify-center size-16 text-white rounded-full transition-colors",
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
              {status === "idle" && <RadiobuttonIcon className="size-8" />}
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
