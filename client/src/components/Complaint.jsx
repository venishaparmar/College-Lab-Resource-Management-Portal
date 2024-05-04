import React, { useState } from "react";
import ComponentComplaintForm from "./ComponentComplaintForm";
import ComputerForm from "./ComputerComplaintForm";
import NavBar from "./NavBar";

const Complaint = () => {
  const [activeOption, setActiveOption] = useState("Component");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      <NavBar />
      <div className="relative max-w-md mx-auto mt-3">
        <div className="overflow-hidden bg-gray-200 pb-3 pr-3 pl-3 shadow-md">
          <div className="flex justify-around">
            {["Component", "Computer(PC)"].map((option) => (
              <button
                key={option}
                className={`w-1/4 py-2 text-center font-medium text-sm ${
                  activeOption === option
                    ? "text-white"
                    : "text-gray-600 bg-transparent"
                } focus:outline-none`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center mt-3">
        {activeOption === "Component" ? (
          <ComponentComplaintForm />
        ) : (
          <ComputerForm />
        )}
      </div>
    </>
  );
};

export default Complaint;
