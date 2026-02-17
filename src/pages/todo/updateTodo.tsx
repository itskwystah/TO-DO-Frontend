// src/pages/UpdateTodo.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/axios/axios-instance"; // Your centralized Axios instance

// Assets
import logo from "@/assets/Logo2.png";

// Modal
import StatusModal from "@/pages/todo/components/modals"; // adjust path if needed

interface Todo {
  id: string;
  title: string;
  description?: string;
}

export interface TodoResponse<T = unknown> {
  message: string;
  data: T;
}

export default function UpdateTodo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Fetch existing task
  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get<TodoResponse<Todo>>(`/todos/${id}`);
        const task = res.data.data;
        setTitle(task.title);
        setDescription(task.description || "");
      } catch (err: unknown) {
        console.error("Error fetching task:", err);

        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to load task. Please try again.",
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load task. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Update task
  const handleUpdate = async () => {
    if (!id) return;
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }

    setUpdating(true);
    setError(null);

    try {
      const response = await axiosInstance.put<TodoResponse<Todo>>(
        `/todos/${id}`,
        {
          title,
          description,
        },
      );
      console.log("Update success:", response.data);

      // Show success modal instead of navigating immediately
      setShowModal(true);
    } catch (err: unknown) {
      console.error("Error updating task:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to update task. Please try again.",
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update task. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  // Modal close handler
  const handleModalClose = () => {
    setShowModal(false);
    // Navigate back after closing modal
    navigate("/dashboardpage");
  };

  if (loading) return <p className="p-4 text-center">Loading task...</p>;

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      <div className="w-375px h-812px bg-[#9CAFAA] rounded-[40px] px-6 py-6 flex flex-col">
        {/* Header */}
        <div className="py-1 px-2">
          <img src={logo} alt="Logo2" />
        </div>

        {/* Title */}
        <div className="-mt-20 px-1">
          <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>
          <div className="h-px bg-black mt-1 w-full max-w-260px" />
        </div>

        {/* Form */}
        <div className="mt-10 flex flex-col gap-6 px-2">
          {/* Title Field */}
          <div>
            <label className="block text-sm -mt-8 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-2 border border-[#9CAFAA] shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-3 border border-[#9CAFAA] shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto flex flex-col gap-3 px-2 ml-auto">
          <button
            onClick={handleUpdate}
            className="bg-[#E5E5E5] px-6 py-2 rounded-xl  shadow-lg hover:opacity-90 transition"
            disabled={updating}
          >
            {updating ? "Updating..." : "UPDATE TASK"}
          </button>

          <button
            onClick={() => navigate("/dashboardpage")}
            className="bg-[#E5E5E5] px-6 py-2 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            &lt; BACK
          </button>
        </div>
      </div>

      {/* Status Modal for "update-success" */}
      <StatusModal
        show={showModal}
        type="update-success"
        onClose={handleModalClose}
      />
    </div>
  );
}
