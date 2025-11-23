import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewParcel = () => {
  const [inputs, setInputs] = useState({});
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await publicRequest.get("/branches");
      setBranches(response.data);
    } catch (error) {
      console.log("Error fetching branches:", error);
      toast.error("Failed to load branches");
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (
        !inputs.from ||
        !inputs.to ||
        !inputs.sendername ||
        !inputs.recipientname ||
        !inputs.senderemail ||
        !inputs.recipientemail ||
        !inputs.weight ||
        !inputs.cost ||
        !inputs.originBranch ||
        !inputs.destinationBranch
      ) {
        toast.error("All fields including branches are required");
        return;
      }

      if (inputs.originBranch === inputs.destinationBranch) {
        toast.error("Origin and destination branches must be different");
        return;
      }

      setLoading(true);
      await publicRequest.post("/parcels", inputs);

      // Clear the input fields
      setInputs({});

      // Show success toast
      toast.success(
        "Parcel has been successfully posted and emails has been sent to the Sender and Recipient!"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to post the parcel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold text-2xl mb-6">New Parcel</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Location & Details</h3>
          
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">From</label>
            <input
              type="text"
              placeholder="Antorio, USA"
              name="from"
              value={inputs.from || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">To</label>
            <input
              type="text"
              placeholder="Saint Mary, USA"
              name="to"
              value={inputs.to || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Origin Branch *</label>
            <select
              name="originBranch"
              value={inputs.originBranch || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full bg-white"
              required
            >
              <option value="">Select Origin Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} - {branch.city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Destination Branch *</label>
            <select
              name="destinationBranch"
              value={inputs.destinationBranch || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full bg-white"
              required
            >
              <option value="">Select Destination Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} - {branch.city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Name</label>
            <input
              type="text"
              placeholder="James Doe"
              name="sendername"
              value={inputs.sendername || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Name</label>
            <input
              type="text"
              placeholder="James Doe"
              name="recipientname"
              value={inputs.recipientname || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Contact & Shipping Info</h3>
          
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Email</label>
            <input
              type="email"
              required
              placeholder="jamesdoe@gmail.com"
              name="senderemail"
              value={inputs.senderemail || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Email</label>
            <input
              type="email"
              placeholder="jamesdoe@gmail.com"
              name="recipientemail"
              value={inputs.recipientemail || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
              required
            />
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Weight</label>
            <input
              type="Number"
              placeholder="20g"
              name="weight"
              value={inputs.weight || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Cost</label>
            <input
              type="Number"
              placeholder="$50"
              name="cost"
              value={inputs.cost || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Date</label>
            <input
              type="date"
              placeholder="25/06/2024"
              name="date"
              value={inputs.date || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Note</label>
            <textarea
              placeholder="Perishable goods"
              name="note"
              value={inputs.note || ""}
              onChange={handleChange}
              type="text"
              className="border-2 border-[#555] border-solid p-[10px] w-full"
            />
          </div>
          <button
            className="bg-[#1E1E1E] cursor-pointer text-white p-[10px] w-full font-semibold hover:bg-[#333] transition-all"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Parcel"}
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewParcel;
