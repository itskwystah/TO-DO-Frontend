import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Assets
import logo from "@/assets/Logo2.png";

export default function UpdateTodo() {
  const { id } = useParams<{ id: string }>(); // Get task ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true); // For fetching task
  const [updating, setUpdating] = useState(false); // For updating task
  const [error, setError] = useState<string | null>(null);

  // Fetch the existing task from backend
  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
        const task = res.data.data;
        setTitle(task.title);
        setDescription(task.description || "");
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Update task function
  const handleUpdate = async () => {
    if (!id) return;
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }

    setUpdating(true);
    setError(null);

    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        title,
        description,
      });
      navigate("/dashboardpage"); // Redirect back to dashboard
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-4 text-center">Loading task...</p>;

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      <div className="w-375px h-812px bg-[#9CAFAA] rounded-[40px] px-6 py-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between py-2 px-4">
          <img src={logo} alt="Logo2" />
        </div>

        {/* Title */}
        <div className="mt-10 px-2">
          <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>
          <div className="h-1px bg-black w-64 mt-2"></div>
        </div>

        {/* Form */}
        <div className="mt-10 flex flex-col gap-6 px-2">
          {/* Title Field */}
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto flex flex-col gap-3 px-2 ml-auto">
          <button
            onClick={handleUpdate}
            className="bg-[#E5E5E5] px-6 py-2 rounded-xl border border-black shadow-md hover:opacity-90 transition"
            disabled={updating}
          >
            {updating ? "Updating..." : "UPDATE TASK"}
          </button>

          <button
            onClick={() => navigate("/dashboardpage")}
            className="bg-[#E5E5E5] px-6 py-2 rounded-xl border border-black shadow-md hover:opacity-90 transition"
          >
            &lt; BACK
          </button>
        </div>
      </div>
    </div>
  );
}
