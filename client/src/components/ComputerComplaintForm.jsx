import React, { useState } from "react";
import toast from "react-hot-toast";

const ComputerComplaintForm = () => {
  const studentToken = localStorage.getItem("currentUser").toString();
  const [formData, setFormData] = useState({
    desktopId: "",
    issue: "",
    imageUpload: null,
    labLocation: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "imageUpload") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("desktopId", formData.desktopId);
      formDataToSend.append("issue", formData.issue);
      formDataToSend.append("imageUpload", formData.imageUpload);
      formDataToSend.append("labLocation", formData.labLocation);
      formDataToSend.append("grNumber", studentToken);

      const response = await fetch(
        "http://localhost:3000/api/computer-complaints/add-complaint",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      setFormData({
        desktopId: "",
        issue: "",
        imageUpload: null,
        labLocation: "",
      });

      document.getElementById("imageUpload").value = "";

      if (response.status === 201) {
        toast.success("Complaint Added Successfully", {
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
          htmlFor="desktopId"
        >
          Desktop ID or Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="desktopId"
          type="text"
          placeholder="Enter desktop ID or number"
          name="desktopId"
          value={formData.desktopId}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="issue"
        >
          What is the issue?
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="issue"
          placeholder="Enter issue description"
          name="issue"
          value={formData.issue}
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

export default ComputerComplaintForm;
