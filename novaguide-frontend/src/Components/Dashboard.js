import React, { useState } from "react"
import FileUpload from "./FileUpload"; // Import FileUpload component
import FileQuery from "./FileQuery"; // Import FileQuery component
import FileAnswer from "./FileAnswer"; // Import FileAnswer component
import Navbar from "./Navbar"; // Import Navbar component

const Dashboard = () => {

  // State to store content of uploaded file
  const [fileContent, setFileContent] = useState("");

  // State to store array of answers
  const [answers, setAnswers] = useState(["Welcome, your answers will be displayed here."]);

  // Function to handle new answer and update the state
  const handleNewAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]); // Append new answer to previous answers
  };

  return (
    <div className="d-flex flex-column position-fixed top-0 w-100">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Component to display answers */}
      <FileAnswer answers={answers} />

      {/* Component to handle file uploads and pass file content */}
      <FileUpload onFileRead={setFileContent} />

      {/* Component to ask questions and receive answers */}
      <FileQuery fileContent={fileContent} onAnswer={handleNewAnswer} />

    </div>
  )
}

export default Dashboard; // Export the Dashboard component
