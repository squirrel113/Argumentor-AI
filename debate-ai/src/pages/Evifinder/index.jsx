import React, { useState, useEffect } from "react";
import EvidenceAsset from "../assets/EvidenceAsset.png";

function EvidenceScraper() {
  const [inputText, setInputText] = useState("");
  const [evidence, setEvidence] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = () => {
    // Fetch data here
    fetch("/evifinder", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: inputText }), // Assuming you want to send the inputText as a JSON payload
    })
      .then(response => response.json())
      .then(data => {
        setEvidence(data); // Update the state with the evidence data
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (buttonClicked) {
      fetchData(); // Fetch data when the button is clicked
      setButtonClicked(false); // Reset buttonClicked state
    }
  }, [buttonClicked]);

  const handleInputChange = event => {
    let inputValue = event.target.value;
    setInputText(inputValue);
  };

  const handleButtonClick = () => {
    setButtonClicked(true); // Trigger fetchData on button click
  };

  return (
    <div className="text-center">
      <img
        src={EvidenceAsset}
        alt=""
        style={{ float: "left", marginRight: "10px" }}
      />
      <h1 className="pt-5 pl-2">Evidence Scraper</h1>
      <p className="pl-2">
        Effectively search for evidence, <span className="font-bold">online</span>{" "}
        through our application. <span className="font-bold">ArguMentor</span>{" "}
        allows users to input any sort of evidence from cases and find information regarding it online/the web.
      </p>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className="pl-2"
        placeholder="Type Here..."
      />
      <br />
      <button
        className="btn btn-primary mt-2 bg-orange pl-2"
        onClick={handleButtonClick}
        style={{ paddingLeft: "8px" }}
      >
        Click to Fetch Evidence
      </button>
      <br />
      <br />
      <ul>
        <h4>
          {evidence.length > 0 ? "Evidences" : null}
        </h4>
        <br />
        {evidence.map((item, index) => (
          <li key={index}>
            <a href='#'>{item.url}</a> :- {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EvidenceScraper;
