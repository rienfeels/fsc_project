import React, { useState } from "react";

const TTSComponent = () => {
  const [text, setText] = useState("");
  const [speech, setSpeech] = useState("");

  const handleGenerateSpeech = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const data = await response.json();
        setSpeech(data.speech);
      } else {
        console.error("Failed to generate speech");
      }
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleGenerateSpeech}>Generate Speech</button>
      {speech && <audio src={speech} controls />}
    </div>
  );
};

export default TTSComponent;
