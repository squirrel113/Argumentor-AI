import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import '../Debate/index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


const WebcamRecorder = () => {
  const webcamRef = React.useRef(null);
  const mediaRecorder = React.useRef(null);
  const [recording, setRecording] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [recordingPath, setRecordingPath] = React.useState("");
  const [analysis, setAnalysis] = React.useState([]);

  const handleStartRecordingClick = React.useCallback(() => {
    setRecording(true);
    mediaRecorder.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorder.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorder.current.start();
  }, [webcamRef, setRecording, mediaRecorder]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopRecordingClick = React.useCallback(() => {
    mediaRecorder.current.stop();
    setRecording(false);
  }, [mediaRecorder, webcamRef, setRecording]);

  const startVideoAnalysis = () => {
    // Fetch data here
    fetch("/startVideoAnalysis", {
              method: 'POST',
              //credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(recordingPath),
            })
        .then(response => response.json())
        .then(data => {
            setAnalysis(data); // Update the state with the evidence data
            console.log(data);
        });
};


   useEffect(() => {
     if (recordingPath.length > 0) {
         //setInputText(inputText)
         startVideoAnalysis(); // Fetch data when the button is clicked
         setAnalysis([])
     }
   }, [recordingPath]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "speech-recording.mp4";
      a.click();
      
      window.URL.revokeObjectURL(url);
      setRecordingPath(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
    <div className="webcam-recorder">
      <h1 className="webcam-recorder-title">Record Your Video</h1>
      <div className="webcam-container">
      <Webcam audio={true} ref={webcamRef} />
      <div className="record-button-container">
      {recording ? (
        <button className = "record-button-recording" onClick={handleStopRecordingClick}>Stop Recording</button>
      ) : (
        <button className = "record-button" onClick={handleStartRecordingClick}>Start Recording</button>
      )}
     
          </div>
          <div className="record-button-container">
          {recordedChunks.length > 0 && (
        <button className = "download-button" onClick={handleDownload}>Download</button>
      )}
      </div>
      <div className="features-section">
       <ul>
          <h4>{analysis.length > 0
              ? "Video Analysis"
              : null
          }</h4>
          <br/>
          {analysis.map((item, index) => (
  <li>
    Maintaining eye contact: {item.maintainingEyeContactPercentage}% of the time
    {item.maintainingEyeContactPercentage > 85
      ? " - Good job!"
      : " - Keep it up."
    }
  </li>
))}
{analysis.map((item, index) => (
  <li>
    Losing eye contact: {item.losingEyeContactPercentage}% of the time
    {item.losingEyeContactPercentage < 85
      ? " - Good start!"
      : " - Tips to improve eye contact: Take pauses and look at the audience while delivering key points."
    }
  </li>
))}

{analysis.map((item, index) => (
  <li>
    Total Stuttering Count: {item.stuttering_count}
    {item.stuttering_count === 0
      ? " - Great job, no stuttering detected!"
      : item.stuttering_count > 5
      ? " - Tips to improve: Try practicing slower, more deliberate speech. Open your mouth wider to enunciate complex words"
      : null
    }
  </li>
))}

      </ul>
     </div>
     </div>
     </div>
    </>

  );
};

// function WebcamRecorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const webcamRef = useRef(null);
//   const [recordedChunks, setRecordedChunks] = React.useState([]);

//   const toggleRecording = () => {
//     setIsRecording(prevState => !prevState);
//     handleDataAvailable
//   };

//   const [feedback, setFeedback] = useState('');

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       let audioChunks = [];

//       mediaRecorder.ondataavailable = event => {
//         audioChunks.push(event.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });

//         const formData = new FormData();
//         formData.append('audio', audioFile);

//         try {
//           const response = await fetch('http://localhost:3000/debate', {
//             method: 'POST',
//             body: formData,
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setFeedback('Feedback: ' + data.feedback);
//           } else {
//             setFeedback('Error processing audio.');
//           }
//         } catch (error) {
//           console.error('Error processing audio:', error);
//         }

//         stream.getTracks().forEach(track => track.stop());
//       };

//       mediaRecorder.start();

//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 5000);  //3 secs.
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }
//   };

//   const handleDataAvailable = React.useCallback(
//     ({ data }) => {
//       if (data.size > 0) {
//         setRecordedChunks((prev) => prev.concat(data));
//       }
//     },
//     [setRecordedChunks]
//   );

//   const handleDownload = React.useCallback(() => {
//     if (recordedChunks.length) {
//       const blob = new Blob(recordedChunks, {
//         type: "video/webm"
//       });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       document.body.appendChild(a);
//       a.style = "display: none";
//       a.href = url;
//       a.download = "react-webcam-stream-capture.webm";
//       a.click();
//       window.URL.revokeObjectURL(url);
//       setRecordedChunks([]);
//     }
//   }, [recordedChunks]);

//   return (
//     <div className="webcam-recorder">
//       <h1 className="webcam-recorder-title">Record Your Video</h1>
//       <div className="webcam-container">
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           className={`webcam-preview ${isRecording ? 'recording' : ''}`}
//         />
//         <div className="record-button-container">
//           <button
//             onClick={toggleRecording}
//             className={`record-button ${isRecording ? 'recording' : ''}`}
//           >
//             {isRecording ? 'Stop Recording' : 'Start Recording'}
//             {recordedChunks.length > 0 && (
//           <button onClick={handleDownload}>Download</button>
//         )}
//           </button>
//         </div>
//       </div>
//       <AdditionalSection />
//       <FeaturesSection />
//       <ContactSection />
//     </div>
//   );
// }

// function AdditionalSection() {
//   return (
//     <div className="additional-section">
//       <h2 className="section-title">Additional Information</h2>
//       <p className="section-content">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, urna ac aliquet
//         sollicitudin, ex eros consequat libero, et ullamcorper turpis dolor sit amet nulla. Duis
//         hendrerit lacus ut leo facilisis, sit amet bibendum elit vulputate.
//       </p>
//     </div>
//   );
// }

//  function FeaturesSection() {
//    return (
//      <div className="features-section">
//        <h2 className="section-title">Features</h2>
//        <ul>
//           <h4>{analysis.length > 0
//               ? "Video Analysis"
//               : null
//           }</h4>
//           <br/>
//           {analysis.map((item, index) => (
//               <li key={index}><a href='#'>{item.url}</a> :- {item.answer} </li>
//           ))}
//       </ul>
//      </div>
//    );
//  }

// function ContactSection() {
//   return (
//     <div className="contact-section">
//       <h2 className="section-title">Contact Us</h2>
//       <p className="section-content">
//         Email: argumentorai@example.com<br />
//         Phone: 925-214-8243
//       </p>
//     </div>
//   );
// }

 export default WebcamRecorder;