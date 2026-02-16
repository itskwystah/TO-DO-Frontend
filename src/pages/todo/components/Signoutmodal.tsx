import { Link } from "react-router-dom";
import { FaTasks, FaClock, FaCheckCircle, FaSignOutAlt, FaTimes } from "react-icons/fa";

interface SignOutModalProps {
  show: boolean;
  onClose: () => void;
  onFilterChange: (filter: "all" | "pending" | "completed") => void;
}

export default function SignOutModal({
  show,
  onClose,
  onFilterChange,
}: SignOutModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl  items-center justify-center z-50">
      <div className="bg-[#FBF3D5]  rounded-2xl p-6 w-80 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600 hover:text-black" />
          </button>
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => {
              onFilterChange("all");
              onClose();
            }}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
          >
            <FaTasks className="text-blue-500" />
            View All Todos
          </button>

          <button
            onClick={() => {
              onFilterChange("pending");
              onClose();
            }}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
          >
            <FaClock className="text-yellow-500" />
            Pending Todos
          </button>

          <button
            onClick={() => {
              onFilterChange("completed");
              onClose();
            }}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
          >
            <FaCheckCircle className="text-green-500" />
            Completed Todos
          </button>

          <Link to="/">
            <button className="flex items-center gap-3 bg-[#D6A99D] hover:opacity-90 p-3 rounded-lg transition w-full">
              <FaSignOutAlt />
              Log Out
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}
