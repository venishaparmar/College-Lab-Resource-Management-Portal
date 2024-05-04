import React, { useState } from "react";
import axios from "axios";
import "../styles/LabCard.css";
import NavBar from "./NavBar";

const LabAvailability = () => {
  const [showModal, setShowModal] = useState(false);
  const [lab, setLab] = useState({ code: "", name: "" });
  const [activeCount, setActiveCount] = useState(5);

  const handleCardClick = async (code, name) => {
    setShowModal(true);
    setLab({ code, name });
    const labCode = code;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/lab-entries/activeStudentsCount",
        { labCode }
      );
      setActiveCount(response.data.activeStudentsCount);
    } catch (error) {
      console.error("Error fetching active students count:", error);
      throw error;
    }
  };
  return (
    <>
      <NavBar />
      <div>
        <div className="card-list">
          <a
            href="#"
            className="card-item"
            onClick={() => handleCardClick("MA115", "Web Development Lab")}
          >
            <h2>MA115</h2>
            <h3>Web Development Lab</h3>
          </a>
          <a
            href="#"
            className="card-item"
            onClick={() => handleCardClick("MA102", "Programming Lab")}
          >
            <h2>MA102</h2>
            <h3>Programming Lab</h3>
          </a>
          <a
            href="#"
            className="card-item"
            onClick={() => handleCardClick("MA112", "Data Science Lab")}
          >
            <h2>MA112</h2>
            <h3>Data Science Lab</h3>
          </a>
          <a
            href="#"
            className="card-item"
            onClick={() => handleCardClick("MA109", "Communication & IoT Lab")}
          >
            <h2>MA109</h2>
            <h3>Communication & IoT Lab</h3>
          </a>
          <a
            href="#"
            className="card-item"
            onClick={() => handleCardClick("MA108", "Project Lab")}
          >
            <h2>MA108</h2>
            <h3>Project Lab</h3>
          </a>
          <a
            href="#"
            className="card-item"
            onClick={() => handleCardClick("MA107", "Embedded Lab")}
          >
            <h2>MA107</h2>
            <h3>Robotics Lab</h3>
          </a>
          {/* Add more card items */}
        </div>
      </div>
      {showModal && (
        <div className="lab-entry-modal">
          <div className="lab-entry-modal-content">
            <h2 style={{ marginBottom: "8px" }}>{lab.name} - Lab Details</h2>
            <div className="lab-details">
              <p style={{ marginBottom: "8px" }}>
                <strong>Lab Code:</strong> {lab.code}
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Lab Capacity:</strong> 30
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Currently Available Students:</strong> {activeCount}
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "16px",
                cursor: "pointer",
                fontSize: "16px",
                padding: "8px 16px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LabAvailability;
