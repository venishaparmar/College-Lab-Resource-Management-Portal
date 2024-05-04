import React, { useState } from "react";
import toast from "react-hot-toast";
const ComponentComplaintForm = () => {
  const studentToken = localStorage.getItem("currentUser").toString();
  const [formData, setFormData] = useState({
    componentId: "",
    componentName: "",
    issueDescription: "",
    imageUpload: null, // Initialize with null
    labLocation: "",
  });

  const handleChange = (e) => {
    // Check if the input is for file upload
    if (e.target.name === "imageUpload") {
      // Update state with the selected file
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Access the file using files[0]
      });
    } else {
      // For other inputs, update state normally
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    // Handle form submission
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("componentId", formData.componentId);
      formDataToSend.append("componentName", formData.componentName);
      formDataToSend.append("issueDescription", formData.issueDescription);
      formDataToSend.append("imageUpload", formData.imageUpload); // Append the file
      formDataToSend.append("labLocation", formData.labLocation);
      formDataToSend.append("grNumber", studentToken);

      // Send formDataToSend to server using fetch or axios
      const response = await fetch(
        "http://localhost:3000/api/complaints/component-complaint",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      // Handle response as needed
      setFormData({
        componentId: "",
        componentName: "",
        issueDescription: "",
        imageUpload: null,
        labLocation: "",
      });

      document.getElementById("imageUpload").value = "";

      if (response.status === 201) {
        toast.success(" Complaint Added Successfully ", {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="componentId"
        >
          Component ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="componentId"
          type="text"
          placeholder="Enter component ID"
          name="componentId"
          value={formData.componentId}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="componentName"
        >
          Component Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="componentName"
          type="text"
          placeholder="Enter component name"
          name="componentName"
          value={formData.componentName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="issueDescription"
        >
          What is the issue?
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="issueDescription"
          placeholder="Enter issue description"
          name="issueDescription"
          value={formData.issueDescription}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="imageUpload"
        >
          Upload Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imageUpload"
          type="file"
          name="imageUpload"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="labLocation"
        >
          Lab Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="labLocation"
          type="text"
          placeholder="Enter lab location"
          name="labLocation"
          value={formData.labLocation}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ComponentComplaintForm;
