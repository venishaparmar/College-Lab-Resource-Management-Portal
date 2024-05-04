import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import ExperimentList from "./ExperimentList";
import NavBar from "./NavBar";

const LabDetail = () => {
  const { id } = useParams();
  const [subjectData, setSubjectData] = useState([]);
  const location = useLocation();
  const lab = location.state.lab;
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const experimentListRef = useRef(null);

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const db = getFirestore();

        const subjectDetailsRef = collection(
          db,
          "lab-details",
          id,
          "subject-details"
        );
        const subjectSnapshot = await getDocs(subjectDetailsRef);
        const myData = subjectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("subject data:", myData);

        setSubjectData(myData);
        setSelectedId(myData[0].id);
        setSelectedSubjectName(myData[0].subject1);
      } catch (error) {
        console.error("Error fetching lab data:", error);
      }
    };

    fetchLabData();
  }, [id]);

  const handleSubjectClick = (subject) => {
    setSelectedId(subject.id);
    setSelectedSubjectName(subject.subject1);
    if (experimentListRef.current) {
      experimentListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">{lab.labName}</h1>
          <p className="text-lg text-gray-600 text-center mb-4">
            Lab Number: {lab.labNumber}
          </p>

          {/* Subjects Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {subjectData.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                onClick={() => handleSubjectClick(subject)}
                style={{ cursor: "pointer" }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={subject.imagePath}
                    alt={subject.subject1}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {subject.subject1}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Semester: {subject.semester}
                  </p>
                  <button className="text-white py-2 px-4 rounded">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={experimentListRef} className="mt-8"></div>
        <h1 className="mt-3 text-3xl font-semibold text-center">
          {" "}
          Experiment List Of {selectedSubjectName}
        </h1>
        <ExperimentList subjectId={selectedId} labId={id} />
      </div>
    </>
  );
};

export default LabDetail;
