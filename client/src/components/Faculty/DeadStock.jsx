import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const DeadStock = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    deadStockNumber: "",
    description: "",
    purchaseDate: "",
    suppliersName: "",
    quantity: "",
    rate: "",
    purchaseAmount: "",
    year: "",
  });
  const [editEntry, setEditEntry] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/deadstock/getAll"
        );
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setFormData({
      ...formData,
      deadStockNumber: entry.deadStockNumber,
      description: entry.description,
      purchaseDate: entry.purchaseDate,
      suppliersName: entry.suppliersName,
      quantity: entry.quantity,
      rate: entry.rate,
      purchaseAmount: entry.purchaseAmount,
      year: entry.year,
    });
    setIsUpdating(true);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleAddEntry = () => {
    const dataToSend = {
      ...formData,
      labNumber: "MA115",
      adminId: "admin123",
    };

    axios
      .post("http://localhost:3000/api/deadstock/add", dataToSend)
      .then((response) => {
        console.log("Data added successfully:", response.data);
        // Reset form data
        setFormData({
          deadStockNumber: "",
          description: "",
          purchaseDate: "",
          suppliersName: "",
          quantity: "",
          rate: "",
          purchaseAmount: "",
          year: "",
        });
        // Close the modal
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        // Handle error here
      });
    setFormData({
      deadStockNumber: "",
      description: "",
      purchaseDate: "",
      suppliersName: "",
      quantity: "",
      rate: "",
      purchaseAmount: "",
      year: "",
    });
    // Close the modal
    setShowModal(false);
    setEntries([...entries, response.data]);
  };

  const handleUpdateEntry = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/deadstock/update/${editEntry._id}`,
        formData
      );
      console.log("Entry updated successfully:", response.data);

      setEntries(
        entries.map((entry) =>
          entry._id === editEntry._id ? response.data : entry
        )
      );

      setFormData({
        deadStockNumber: "",
        description: "",
        purchaseDate: "",
        suppliersName: "",
        quantity: "",
        rate: "",
        purchaseAmount: "",
        year: "",
      });
      setShowModal(false);
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handleDeleteEntry = (id) => {
    axios
      .delete(`http://localhost:3000/api/deadstock/delete/${id}`)
      .then((response) => {
        console.log("Entry deleted successfully");
        // Remove the deleted entry from the state
        setEntries(entries.filter((entry) => entry._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
        // Handle error here
      });
  };

  return (
    <>
      <AdminNavbar />
      {!showModal && (
        <>
          <h1 className="text-5xl font-bold mt-5 mb-2 text-center">
            Dead Stock Register
          </h1>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
              <div className="ml-auto">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
                >
                  Add Entry +
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b"
                    >
                      Sr. No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Dead Stock Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Description / Name of goods
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Purchase Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Suppliers Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Purchase Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                      Year
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.map((entry, index) => (
                    <tr
                      key={entry._id}
                      className="transition-all hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.deadStockNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {formatDate(entry.purchaseDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.suppliersName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.rate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.purchaseAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b">
                        {entry.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md flex items-center"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry._id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md flex items-center ml-2"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {showModal && (
        <div className="mt-4 mb-4 bg-white rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">
            {" "}
            {isUpdating ? "Update Entry" : "Add New Entry"}
          </h2>
          <div>
            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-4">
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {key === "purchaseDate" ? (
                  <input
                    type="date"
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : key === "year" ? (
                  <input
                    type="number"
                    id={key}
                    name={key}
                    value={formData[key]}
                    min="1900"
                    max="2100"
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end">
            {isUpdating ? (
              <button
                onClick={handleUpdateEntry}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md mr-4"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleAddEntry}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md mr-4"
              >
                Add Entry
              </button>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeadStock;
