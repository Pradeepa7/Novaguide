import React, { useState } from "react";
import axios from "axios";

const FileQuery = ({ fileContent, onAnswer }) => {
  // State to manage user question input
  const [question, setQuestion] = useState("");

  // State to manage loading spinner/text while waiting for API response
  const [loading, setLoading] = useState(false);

  // Function to handle question submission
  const handleAsk = async () => {
    // Validate that file content is available and question is not empty
    if (!fileContent || !question.trim()) {
      alert("Please upload a file and enter a question.");
      return;
    }

    setLoading(true); // Show loading while request is being processed

    try {
     // Send file content and question to backend API using base URL from environment variables
     const response = await axios.post(`${process.env.REACT_APP_API_URL}/filecontent/ask`, {
     fileContent,
     question,
     });



      // Extract the AI answer from response or show fallback
      const answer = response.data.answer || "No response received.";
      console.log("AI Answer:", answer);

      // Pass the answer back to parent component
      onAnswer(answer);
    } catch (error) {
      // Handle any error from API request
      console.error("Error asking question:", error);
      onAnswer("Something went wrong.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-body">
          {/* Title of the card */}
          <h5 className="card-title text-primary">Ask a Question</h5>

          {/* Text area for user to type their question */}
          <textarea
            rows="2"
            className="form-control mb-3"
            placeholder="Ask a question from the file..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* Button to submit the question */}
          <button
            className="btn btn-primary w-100"
            onClick={handleAsk}
            disabled={loading}
          >
            {/* Change button text while loading */}
            {loading ? "Getting Answer..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileQuery; // Export the component to be used in other parts of the app
