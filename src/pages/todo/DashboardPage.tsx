import logo from "@/assets/Logo2.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "@/axios/axios-instance";
import InputFieldList, { type Task } from "@/components/InputFieldList";
import SignOutModal from "@/pages/todo/components/Signoutmodal";

import { FaBars } from "react-icons/fa";

interface TodoResponse {
  data: {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
  }[];
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<TodoResponse>("/todos");

      const mappedTasks: Task[] = res.data.data.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
      }));

      setTasks(mappedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Navigate to create new task page
  const createTodo = () => navigate("/createtodo");

  // Filter tasks by completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="py-2 px-4">
          <img src={logo} alt="Logo" />
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="text-black hover:opacity-80 transition"
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Title */}
      <div className="px-8 mt-6">
        <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>
        <div className="h-px bg-black mt-1 w-full max-w-260px" />
      </div>

      {/* Add Task Button */}
      <div className="px-8 mt-6">
        <button
          onClick={createTodo}
          className="w-full bg-[#D9D9D9] text-black py-3 rounded-xl border border-gray-500 shadow-sm hover:opacity-90 transition"
        >
          + ADD NEW TASK
        </button>
      </div>

      {/* Task List */}
      <div className="px-6 mt-6 flex-1">
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          // Pass tasks and setTasks to InputFieldList
          <InputFieldList tasks={filteredTasks} setTasks={setTasks} />
        )}
      </div>

      {/* Sign Out / Filter Menu */}
      <SignOutModal
        show={showMenu}
        onClose={() => setShowMenu(false)}
        onFilterChange={setFilter}
      />
    </div>
  );
}
