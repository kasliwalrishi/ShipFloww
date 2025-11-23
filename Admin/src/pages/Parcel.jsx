import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect } from "react";
import { useState } from "react";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Status mapping - mapping string names to numeric values for database
  const statusOptions = [
    { value: "Pending", numValue: 1, label: "Pending" },
    { value: "Dispatched", numValue: 2, label: "Dispatched" },
    { value: "In Transit", numValue: 3, label: "In Transit" },
    { value: "Out for Delivery", numValue: 4, label: "Out for Delivery" },
    { value: "Delivered", numValue: 5, label: "Delivered" },
  ];

  // Convert numeric status to string label
  const getStatusLabel = (numStatus) => {
    const found = statusOptions.find(opt => opt.numValue === numStatus);
    return found ? found.value : "Pending";
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
        // Convert numeric status to string label
        const statusLabel = getStatusLabel(res.data.status);
        setStatus(statusLabel);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleUpdate = async () => {
    try {
      if (Object.keys(inputs).length > 0) {
        await publicRequest.put(`/parcels/${parcel._id}`, inputs);
        setSuccessMessage("Parcel updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      // Find the numeric value corresponding to the string status
      const statusOption = statusOptions.find(opt => opt.value === status);
      const numericStatus = statusOption ? statusOption.numValue : 1;

      await publicRequest.put(`/parcels/${parcel._id}`, {
        status: numericStatus,
      });
      setSuccessMessage("Status updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error updating status: " + error.message);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold text-2xl mb-4">Edit Parcel</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          {successMessage}
        </div>
      )}

      <div className="flex gap-8">
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">From</label>
            <input
              type="text"
              placeholder={parcel.from}
              name="from"
              value={inputs.from || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">To</label>
            <input
              type="text"
              placeholder={parcel.to}
              name="to"
              value={inputs.to || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Name</label>
            <input
              type="text"
              placeholder={parcel.sendername}
              name="sendername"
              value={inputs.sendername || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Name</label>
            <input
              type="text"
              placeholder={parcel.recipientname}
              name="recipientname"
              value={inputs.recipientname || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Email</label>
            <input
              type="email"
              placeholder={parcel.senderemail}
              name="senderemail"
              value={inputs.senderemail || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Email</label>
            <input
              type="email"
              placeholder={parcel.recipientemail}
              name="recipientemail"
              value={inputs.recipientemail || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
        </div>

        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Weight</label>
            <input
              type="Number"
              placeholder={parcel.weight}
              name="weight"
              value={inputs.weight || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Cost</label>
            <input
              type="Number"
              placeholder={parcel.cost}
              name="cost"
              value={inputs.cost || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Date</label>
            <input
              type="date"
              placeholder="25/06/2024"
              name="date"
              value={parcel.date || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Note</label>
            <textarea
              placeholder={parcel.note}
              type="text"
              name="note"
              value={inputs.note || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>

          {Object.keys(inputs).length > 0 && (
            <button
              className="bg-[#1E1E1E] cursor-pointer text-white p-[10px] w-[300px] mb-[10px]"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="flex flex-col m-[20px] min-w-[320px]">
          <h2 className="font-semibold text-lg mb-4">Status Management</h2>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="status" className="font-semibold mb-2">
              Update Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-2 border-[#555] border-solid p-[10px] bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-[#28a745] cursor-pointer text-white p-[10px] mb-[10px] font-semibold hover:bg-[#218838]"
            onClick={handleStatusUpdate}
          >
            Update Status
          </button>

          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              <strong>Current Status:</strong> {status}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Last Updated:</strong>{" "}
              {parcel.updatedAt
                ? new Date(parcel.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcel;
