import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";


const ExperimentList = ({ subjectId, labId }) => {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const db = getFirestore();
        const experimentDetailsRef = collection(
          db,
          "lab-details",
          labId,
          "subject-details",
          subjectId,
          "experiment-details"
        );

        const experimentsSnapshot = await getDocs(experimentDetailsRef);
        const experimentsData = experimentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperiments(experimentsData);
      } catch (error) {
        console.error("Error fetching experiments:", error);
      }
    };

    fetchExperiments();
  }, [subjectId]); // Dependency on subjectId
  console.log(experiments);
  return (
    <>
      <h1 className="mx-auto"></h1>
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-1 gap-6">
          {experiments.map((experimentObj, index) => (
            <div key={experimentObj.id}>
              {Object.keys(experimentObj).map(
                (key) =>
                  key.startsWith("experiment") && (
                    <h2
                      key={key}
                      className="text-lg font-semibold bg-white mt-2 rounded-lg p-3 shadow-md"
                    >
                      {experimentObj[key]}
                    </h2>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExperimentList;
