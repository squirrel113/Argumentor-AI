import React from "react";
import "../Popup/index.css";

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="content-container">
          <h2>How to Use</h2>
          <p>Scroll down to discover the main sections! You can also use the top bar to navigate through our different tools. Have fun!</p>
        </div>
        <div className="button-container">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
