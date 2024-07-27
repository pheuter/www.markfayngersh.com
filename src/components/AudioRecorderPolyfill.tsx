"use client";

import { useEffect } from "react";

export default function AudioRecorderPolyfill() {
  useEffect(() => {
    async function polyfillMediaRecorder() {
      const AudioRecorder = (await import("audio-recorder-polyfill")).default;
      // @ts-ignore
      const mpegEncoder = (await import("audio-recorder-polyfill/mpeg-encoder"))
        .default;
      AudioRecorder.encoder = mpegEncoder;
      AudioRecorder.prototype.mimeType = "audio/mpeg";
      window.MediaRecorder = AudioRecorder;
    }

    polyfillMediaRecorder();
  }, []);

  return null;
}
