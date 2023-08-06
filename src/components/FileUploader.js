// src/components/FileUploader.js
import React from 'react';
import * as xlsx from 'xlsx';

function FileUploader({ onFileUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = xlsx.read(e.target.result, { type: 'binary' });
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        onFileUpload(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUploader;
