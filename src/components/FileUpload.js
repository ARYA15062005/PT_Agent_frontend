import React, { useState } from 'react';
import '../styles/FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      {file && <button onClick={handleUpload}>Upload</button>}
    </div>
  );
};

export default FileUpload;
