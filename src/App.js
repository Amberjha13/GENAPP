// src/App.js
import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import NarrativeGenerator from './components/NarrativeGenerator';

function App() {
  const [excelData, setExcelData] = useState([]);

  return (
    <div>
      <h1>Generate Narratives from Excel</h1>
      <FileUploader onFileUpload={setExcelData} />
      {excelData.length > 0 && <NarrativeGenerator data={excelData} />}
    </div>
  );
}

export default App;
