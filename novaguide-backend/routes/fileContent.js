var express = require('express'); // Import Express framework
var router = express.Router(); // Create an Express Router
var axios = require("axios"); // Import Axios for making HTTP requests

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); // Basic GET route response
});

// POST endpoint to handle AI question-answering based on uploaded file content
router.post("/ask", async (req, res) => {
  const { fileContent, question } = req.body; // Extract file content and question from the request body

  try {
    // Make a POST request to the GROQ API with the file content and question
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192", // Using LLaMA 3 model
        messages: [
          {
            role: "system", // System message to guide the AI's behavior
            content: "You are a helpful assistant who answers questions based on uploaded file content.",
          },
          {
            role: "user", // User message with file content and question
            content: `File content:\n${fileContent}\n\nQuestion: ${question}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // Use API key from environment variable
        },
      }
    );

    // Send the AI's response back to the client
    res.json({ answer: response.data.choices?.[0]?.message?.content || "No response received." });

  } catch (error) {
    // Log and return error if the API call fails
    console.error("GROQ API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from GROQ" });
  }
});

module.exports = router; // Export the router for use in app.js
