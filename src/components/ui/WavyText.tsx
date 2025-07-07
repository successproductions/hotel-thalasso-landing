// components/WavyText.tsx
import React from "react";

interface WavyTextProps {
  text: string;
  replay?: boolean;
}

export default function WavyText({ text, replay = true }: WavyTextProps) {
  const letters = Array.from(text);

  return (
    <span className="wavy-container">
      {letters.map((char, i) => (
        <span
          key={i}
          className="wavy-letter"
          style={{
            animation: replay
              ? `wave 0.6s ease-in-out ${i * 0.08}s both`
              : "none",
          }}
        >
          {char}
        </span>
      ))}

      <style jsx>{`
        .wavy-container {
          display: inline-block;
          /* preserve your original spaces */
          white-space: pre;
        }
        .wavy-letter {
          display: inline-block;
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-0.5em); }
        }
      `}</style>
    </span>
  );
}
