"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "recording" | "loading" | "dictating";

interface Props {
  article: string;
}

export default function Voice({ article }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const getSupportedMimeType = () => {
    const types = ["audio/webm", "audio/mp4", "audio/mpeg", "audio/ogg"];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return "audio/webm"; // Fallback, though it might not work in Safari
  };

  const getFileExtension = (mimeType: string) => {
    const extensions: { [key: string]: string } = {
      "audio/webm": "webm",
      "audio/mp4": "mp4",
      "audio/mpeg": "mp3",
      "audio/ogg": "ogg",
    };
    return extensions[mimeType] || "webm";
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const options = { mimeType: getSupportedMimeType() };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const mimeType = getSupportedMimeType();
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        audioChunksRef.current = [];
        await processRecording(audioBlob, mimeType);
      };

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

  const processRecording = async (audioBlob: Blob, mimeType: string) => {
    try {
      const formData = new FormData();
      formData.append("article", article);
      formData.append("file", audioBlob, `audio.${getFileExtension(mimeType)}`);

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseAudioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(responseAudioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setStatus("idle");
        URL.revokeObjectURL(audioUrl);
      };

      setStatus("dictating");
      await audio.play();
    } catch (error) {
      console.error("Failed to process recording:", error);
      setStatus("idle");
    }
  };

  const handleButtonClick = useCallback(() => {
    if (status === "idle") {
      startRecording();
    } else if (status === "recording") {
      stopRecording();
    }
  }, [status, startRecording, stopRecording]);

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
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        className={cn("size-24 rounded-full transition-colors", {
          "bg-secondary": status === "idle",
          "bg-primary": status === "recording",
          "bg-primary animate-pulse": status === "loading",
          "bg-blue-500": status === "dictating",
          "cursor-not-allowed": status === "loading" || status === "dictating",
        })}
        onClick={handleButtonClick}
        disabled={status === "loading" || status === "dictating"}
      />
    </div>
  );
}