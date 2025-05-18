import React, { useState } from "react";

const FileUpload = ({ onFileRead }) => {
    // State to store the uploaded file
    const [file, setFile] = useState(null);

    // Allowed file types and max file size (5MB)
    const maxFileSize = 5 * 1024 * 1024;

    // Handle file upload input change
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0]; // Get the selected file

        if (!uploadedFile) return;

        // Validate file type
        if (uploadedFile.type !== "text/plain") {
            alert("Please upload a valid .txt file.");
            return;
        }

        // Validate file size
        if (uploadedFile.size > maxFileSize) {
            alert("File size exceeds 5MB limit.");
            return;
        }

        setFile(uploadedFile); // Store the valid file in state

        const reader = new FileReader(); // Create a FileReader instance
        reader.onload = (event) => {
            onFileRead(event.target.result); // Pass the file content to parent component
        };
        reader.readAsText(uploadedFile); // Read file content as text
    };

    // Function to alert file upload success
    const fileUploadBtn = () => {
        alert("File uploaded successfully");
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            {/* Card container for file upload UI */}
            <div className="card" style={{ backgroundColor: '#63c9f9' }}>
                <div className="card-body d-flex justify-content-around align-items-center">
                    {/* File input element with .txt file restriction */}
                    <input
                        className="form-control w-75"
                        type="file"
                        accept=".txt"
                        id="formFile"
                        onChange={handleFileUpload}
                    />
                    {/* Upload button - enabled only when a file is selected */}
                    <button
                        type="submit"
                        className="btn btn-primary rounded-pill"
                        disabled={!file}
                        onClick={fileUploadBtn}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload; // Exporting the FileUpload component
