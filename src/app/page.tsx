"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const description = `यह एक उदाहरण है जहाँ आप बटन पर क्लिक करके इस टेक्स्ट को 
  हिंदी महिला आवाज़ में सुन सकते हैं।`;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Load voices when available
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSpeak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(description);

    // Find Hindi female voice
    const hindiFemaleVoice =
      voices.find(
        (v) =>
          v.lang.toLowerCase() === "hi-in" &&
          v.name.toLowerCase().includes("female")
      ) || voices.find((v) => v.lang.toLowerCase() === "hi-in");

    if (hindiFemaleVoice) {
      utterance.voice = hindiFemaleVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: 20 }}>
      <p>{description}</p>
      <button
        onClick={handleSpeak}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "10px",
        }}
        aria-label="Read description in Hindi female voice"
      >
        Speaker
      </button>
    </div>
  );
}
