import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo as createTodoApi } from "@/api/todos/todos";

// Assets
import logo from "@/assets/Logo2.png";
import axios from "axios";

export default function CreateTodo() {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
  setLoading(true);
  setError("");

  const res = await createTodoApi(title, description);
  console.log("Todo created:", res);

  // Navigate after success
  navigate("/dashboardpage");
} catch (err: unknown) {
  // err is unknown, so we check if it's an AxiosError
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

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      <div className="w-375px h-812px bg-[#9CAFAA] rounded-[40px] px-6 py-6 flex flex-col ">
        {/* Header */}
        <div className="flex flex-row justify-between py-2 px-4">
          <img src={logo} alt="Logo" />
        </div>

        {/* Title */}
        <div className="px-1 -mt-10">
          <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>
          <span className="flex items-center px-1">
            <span className="h-px w-80 bg-black"></span>
          </span>
          <div className="h-1px bg-black w-64 mt-2"></div>
        </div>

        {/* Form */}
        <div className="mt-10 flex flex-col gap-6 px-2">
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              rows={6}
              placeholder="Description"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-3 border border-black resize-none focus:ring-[#D6A99D]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto flex flex-col gap-3 px-2 ml-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#E5E5E5] px-6 py-2 rounded-xl border border-black shadow-md hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "+ ADD NEW TASK"}
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
