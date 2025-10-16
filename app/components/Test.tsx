"use client";
import React, { useState } from "react";


export default function MyComponent() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="relative">
      <button onClick={handleOpenPopup}>Open Popup</button>
      {showPopup && (
        <div className="popup-overlay fixed">
          <div className="popup-content">
            <h2>My Custom Popup</h2>
            <p>This is my custom popup content.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
