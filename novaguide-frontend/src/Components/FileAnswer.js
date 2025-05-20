import React, { useRef, useEffect } from "react";

const FileAnswer = ({ answers }) => {
  // Create a reference to the answer box div
  const answerBoxRef = useRef(null);

  // Auto-scroll to the bottom whenever a new answer is added
  useEffect(() => {
    if (answerBoxRef.current) {
      answerBoxRef.current.scrollTop = answerBoxRef.current.scrollHeight;
    }
  }, [answers]);

  return (
    <div
      className="mt-5 p-4 rounded shadow"
      ref={answerBoxRef} // Attach the ref to enable auto-scrolling
      style={{
        background: "linear-gradient(135deg, #f0f8ff, #e6f0ff)", // Light blue gradient background
        border: "1px solid #007bff", // Blue border
        height: "180px", // Fixed height with scroll
        overflowY: "auto", // Enable vertical scrolling
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Font style
        color: "#004085", // Text color
        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)", // Box shadow for depth
        transition: "all 0.3s ease-in-out" // Smooth transition for future style changes
      }}
    >
      {/* Render each answer in its own styled block */}
      {(answers || []).map((ans, idx) => (
        <div
          key={idx}
          className="mb-2 p-2 rounded"
          style={{
            background: "#ffffff", // White background for each answer
            borderLeft: "4px solid #007bff", // Blue left border for emphasis
            color: "#000", // Black text color
            textAlign: "left" // Left-align the answer text
          }}
        >
          {ans}
        </div>
      ))}
    </div>
  );
};

export default FileAnswer; // Export the component to be used elsewhere
