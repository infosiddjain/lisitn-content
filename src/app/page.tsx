"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice[]>([]);
  const text = "Hello my name is SIddh";
  const description = `यह एक उदाहरण है जहाँ आप बटन पर क्लिक करके इस टेक्स्ट को 
  हिंदी महिला आवाज़ में सुन सकते हैं।`;

  useEffect(() => {
    const loadVoice = () => {
      setVoice(window.speechSynthesis.getVoices());
    };
    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;
  }, []);

  const handleSpeak = () => {
    const uttrance = new SpeechSynthesisUtterance(description);
    uttrance.lang = "hi-IN";

    const hindiFemale = voice.find(
      (v) => v.lang === "hi-IN" && v.name.toLocaleLowerCase().includes("female")
    );

    if (hindiFemale) {
      uttrance.voice = hindiFemale;
    }

    window.speechSynthesis.speak(uttrance);
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
