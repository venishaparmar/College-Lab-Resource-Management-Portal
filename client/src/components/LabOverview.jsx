import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import NavBar from "./NavBar";

const LabOverview = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const db = getFirestore();
        const labDetailsRef = collection(db, "lab-details");
        const snapshot = await getDocs(labDetailsRef);
        const labsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLabs(labsData);
      } catch (error) {
        console.error("Error fetching lab data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, []);

  const handleLabDetailClick = (lab) => {
    navigate(`/lab-detail/${lab.id}`, { state: { lab } });
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Lab Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <Loader />
          ) : (
            labs.map((lab, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-2xl transition duration-300"
                onClick={() => handleLabDetailClick(lab)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="text-xl font-semibold mb-2">{lab.labName}</h2>
                <p className="text-gray-600">Lab Number: {lab.labNumber}</p>
                <button className="mt-4 text-white py-2 px-4 rounded">
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LabOverview;
