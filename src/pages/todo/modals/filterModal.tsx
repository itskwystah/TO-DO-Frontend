import { FaTasks, FaClock, FaCheckCircle, FaTimes } from "react-icons/fa";

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
  onFilterChange: (filter: "all" | "pending" | "completed") => void;
}

export default function FilterModal({
  show,
  onClose,
  onFilterChange,
}: FilterModalProps) {
  if (!show) return null;

  return (
    <div className="absolute right-0 mt-40 mr-5 w-72 bg-[#FBF3D5] rounded-2xl p-6 shadow-xl z-50">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Filter Tasks</h2>
        <button onClick={onClose}>
          <FaTimes className="text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            onFilterChange("all");
            onClose();
          }}
          className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
        >
          <FaTasks className="text-blue-500" />
          View All Tasks
        </button>

        <button
          onClick={() => {
            onFilterChange("pending");
            onClose();
          }}
          className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
        >
          <FaClock className="text-yellow-500" />
          Pending Tasks
        </button>

        <button
          onClick={() => {
            onFilterChange("completed");
            onClose();
          }}
          className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
        >
          <FaCheckCircle className="text-green-500" />
          Completed Tasks
        </button>
      </div>
    </div>
  );
}