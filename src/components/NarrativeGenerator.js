// src/components/NarrativeGenerator.js
import React from 'react';

function NarrativeGenerator({ data }) {

  const completedTask = [];
  const loginServiceStatus= [];
  const dashBoardStatus = [];
  const ssoStatus= [];
  const otherStatus = [];
  let noOfInProgressStories = 0;
  let noOfCompletedStories = 0;
  let totalActiveResource = new Set();
  let sumOfCompletedStories = 0;
  let sumOfInProgressStories = 0;

  const generateNarratives = () => {
    // Generate narratives from data
       data.map(row => {
        totalActiveResource.add(row['Assigned To']);
        if(row['Status'].toLowerCase() === 'completed'){
           // completedTask.push(row['Story Description'])+ " has been done";
           completedTask.push(row['Story Description'] + " has been done");
           noOfCompletedStories = noOfCompletedStories+1;
           sumOfCompletedStories = sumOfCompletedStories+row['Story Points'];
        } else{

        if(row['Assigned To'].toLowerCase() === 'mallik'){
          loginServiceStatus.push(row['Story Description']+ " is in progress and "+ row['Progress']*100+ "% has been completed");
        }else if(row['Assigned To'].toLowerCase() !== 'mallik' && 
          row['Application'] === 'B2C'){
            dashBoardStatus.push(row['Story Description']+ " is in progress and "+ row['Progress']*100+ "% has been completed")
        }else if(row['Application'].toLowerCase() === 'SSO'){
            ssoStatus.push(row['Story Description']+ " is in progress and "+ row['Progress']*100+ "% has been completed")
        }else{
          otherStatus.push(row['Story Description']+ " is in progress and "+ row['Progress']*100+ "% has been completed")
        }
        noOfInProgressStories =  noOfInProgressStories+1;
        sumOfInProgressStories = sumOfInProgressStories+row['Story Points'];
      }
      //progres
    });  
   };

  const extractTextFromPage = () => {
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode.textContent);
    }

    return textNodes.join('\n');
  };


  const downloadPageContent = () => {
    const pageContent = extractTextFromPage();
    const blob = new Blob([pageContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'page_content.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      {generateNarratives()}
      {<div>
      <button onClick={downloadPageContent}>Download Page Content</button>
    </div>}
        <h1>B2C/PBM weekly summery</h1>
        <span>Total number of Stories in progress</span> : <span><b>{noOfInProgressStories}</b></span>
        <br></br>
        <span>Sum of Stories in progress</span> : <span><b>{sumOfInProgressStories}</b></span>
        <br></br>
        <span>Total number of stories completed</span> : <span><b>{noOfCompletedStories}</b></span>
        <br></br>
        <span>Sum of stories completed</span> : <span><b>{sumOfCompletedStories}</b></span>
        <br></br>
        <span>Total resource participating</span> : <span><b>{totalActiveResource.size}</b></span>
        <br></br>
        <h2>Current Status</h2><br/><br/>
        <h3>Login Service</h3>
        ------------------------------------------------------------------------------
        {loginServiceStatus.map((narrative, index) => <p key={index}>{narrative}</p>)}
        ------------------------------------------------------------------------------------
        <br/><br/><h3>SSO</h3>
        ----------------------------------------------------------------------------------
        {ssoStatus.map((narrative, index) => <p key={index}>{narrative}</p>)}
        -------------------------------------------------------------------------------------
        <br/><br/><h3>Dashboard</h3>
        -------------------------------------------------------------------------------------
        {dashBoardStatus.map((narrative, index) => <p key={index}>{narrative}</p>)}
        ------------------------------------------------------------------------------------
        <br/><br/><h3>PBM</h3>
        -------------------------------------------------------------------------
        {otherStatus.map((narrative, index) => <p key={index}>{narrative}</p>)}
        ---------------------------------------------------------------------------------
        <br/><br/><h2>Completed Stories</h2> 
      {completedTask.map((narrative, index) => <p key={index}>{narrative}</p>)} 
      ----------------------------------------------------------------------------------

    </div>
  );
}

export default NarrativeGenerator;
