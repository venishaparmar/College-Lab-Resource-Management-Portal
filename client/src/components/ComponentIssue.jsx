import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import app from "../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ComponentIssue = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialComponentName = queryParams.get("componentName") || "";
  const [componentName, setComponentName] = useState(initialComponentName);
  const [quantity, setQuantity] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const db = getFirestore(app);
      const resourceDetailsCollectionRef = collection(db, "resource-details");

      try {
        const querySnapshot = await getDocs(resourceDetailsCollectionRef);
        const suggestionsData = [];
        querySnapshot.forEach((doc) => {
          suggestionsData.push(doc.data().name);
        });

        setSuggestions(suggestionsData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComponentName(inputValue);

    if (inputValue === "") {
      setFilteredSuggestions([]);
      return;
    }
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };
  const handleSubmit = async () => {
    const grNumber = localStorage.getItem("currentUser");
    const response = await fetch(
      "http://localhost:3000/api/component/component-issue",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          componentName,
          quantity,
          issueDate,
          returnDate,
          purpose,
          grNumber,
        }),
      }
    );
    // Handle response
    const data = await response.json();
    if (response.ok) {
      toast.success(" Request Added Successfully ", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      setComponentName("");
      setQuantity("");
      setIssueDate("");
      setReturnDate("");
      setPurpose("");
    } else {
      const errorMessages = json.errors.map((error) => error.msg);
      toast.error(`${errorMessages[0]}`, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-10 mb-5">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Component Issue Request</h1>
            <div className="relative mb-4">
              <label className="block mb-1">Component Name</label>
              <input
                type="text"
                value={componentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              {/* Suggestions dropdown */}
              {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-b-lg shadow-lg">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setComponentName(suggestion)} // Set suggestion as input value on click
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Issue Date</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Purpose</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full  text-white py-2 rounded-lg  transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentIssue;
