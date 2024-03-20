import React, { useState } from "react";

const SyllabusPopup = ({
  dayNumber,
  unitNumber,
  unitName,
  onClose,
  uploadedFiles, // Danh sách các file đã được upload
  onUploadFile, // Hàm xử lý upload file
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newSelectedFiles = [...selectedFiles, ...files];
    setSelectedFiles(newSelectedFiles);
  };

  const handleUpload = () => {
    selectedFiles.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB.");
        return;
      }
      onUploadFile(file);
    });
    setSelectedFiles([]);
  };

  return (
    <div className="syllabusPopup">
      <h2>Syllabus Information</h2>
      <div className="dayName">
        <p>Day: {dayNumber}</p>
      </div>
      <div className="unitInfor" style={{ display: "flex" }}>
        <p>Unit: {unitNumber}</p>
        <p>Unit Name: {unitName}</p>
      </div>
      <div className="uploadFile">
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={handleUpload}>Upload</button>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            File {index + 1}: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        ))}
        {uploadedFiles && uploadedFiles.map((file, index) => (
          <div key={index}>
            File {index + 1}: {file.name}
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SyllabusPopup;
