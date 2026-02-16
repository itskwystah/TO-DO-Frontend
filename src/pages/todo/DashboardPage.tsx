// Assets
import logo from "@/assets/Logo2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import InputFieldList from "@/components/InputFieldList";
import SignOutModal from "@/pages/todo/components/Signoutmodal";
import type { Task } from "@/components/InputFieldList";

// Icons
import { FaBars } from "react-icons/fa";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "To Do 1", completed: false },
    { id: 2, title: "To Do 2", completed: false },
    { id: 3, title: "To Do 3", completed: false },
    { id: 4, title: "To Do 4", completed: false },
  ]);

  // Input state
  const [input, setInput] = useState("");

  // Modal & filter state
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  // Add new task
  const createTodo = () => {
    if (!input.trim()) return;

    navigate("/createtodo", {
      state: { title: input },
    });

    setInput("");
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 ">
        <div className="py-2 px-4">
          <img src={logo} alt="Logo" />
        </div>

       {/* Hamburger menu button */}
        <button
          onClick={() => setShowMenu(true)}
          className=" text-black py-2  mr-2 mb-35  hover:opacity-90 transition"
        >
          <FaBars size={30} />
        </button>
      </div>

      {/* Title */}
      <div className="px-8 -mt-10">
        <h1 className="text-2xl font-bold">TO DO LIST</h1>
        <span className="flex items-center">
          <span className="h-px w-80 bg-black"></span>
        </span>
      </div>

      {/* Input + Add button */}
      <div className="px-8 mt-6 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task title"
          className="flex-1 bg-[#FBF3D5] rounded-xl px-4 py-2 outline-none border border-gray-300"
        />
        <button
          onClick={createTodo}
          className="bg-[#D6A99D] text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
        >
          + ADD TASK
        </button>
      </div>

      {/* Task List */}
      <div className="px-8 mt-6">
        <InputFieldList tasks={filteredTasks} setTasks={setTasks} />
      </div>

      {/* SignOut Modal */}
      <SignOutModal
        show={showMenu}
        onClose={() => setShowMenu(false)}
        onFilterChange={setFilter}
      />
    </div>
  );
}
