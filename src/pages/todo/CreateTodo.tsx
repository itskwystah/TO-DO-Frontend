// Libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodoApi as createTodoApi } from "@/api/todo/todo.api";
import axios from "axios";

// Assets
import logo from "@/assets/Logo2.png";

// Modal
import StatusModal from "@/pages/todo/modals/modals"; // path to your modal
import { IoChevronBack } from "react-icons/io5";

export default function CreateTodo() {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createTodoApi(title, description);

      // Show "success-added" modal
      setShowModal(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error creating task");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error creating task");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dashboardpage"); // Navigate after closing modal
  };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      <div className="w-375px h-812px bg-[#9CAFAA] rounded-[40px] px-6 py-6 flex flex-col ">
        {/* Header */}
        <div className="flex flex-row justify-between py-2 px-1">
          <img src={logo} alt="Logo" />
        </div>

        {/* Title */}
        <div className="px-1 -mt-20 flex flex-row items-center gap-3" >
          <IoChevronBack   onClick={() => navigate("/dashboardpage")} />
          <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>
          {/* <div className="h-px bg-black mt-1 w-full max-w-260px" /> */}
        </div>

        {/* Form */}
        <div className="mt-10 flex flex-col gap-6 px-2">
          <div>
            <label className="block text-sm -mt-8 mb-1">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-2 border shadow-lg border-[#9CAFAA] focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              rows={6}
              placeholder="Description"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-3 border shadow-lg border-[#9CAFAA] focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-5 flex flex-col gap-3 px-2 ml-auto ">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#E5E5E5] px-4 py-2 rounded-xl shadow-lg hover:opacity-60 transition cursor-pointer"
          >
            {loading ? "Saving..." : " ADD NEW TASK"}
          </button>
        </div>
      </div>

      {/* Status Modal for "success-added" */}
      <StatusModal
        show={showModal}
        type="success-added"
        onClose={handleModalClose}
      />
    </div>
  );
}
