// Assets
import logo from "@/assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Components
import InputFieldList from "@/components/InputFieldList";
import type { Task } from "@/components/InputFieldList";


export default function DashboardPage() {
  const navigate = useNavigate();

 
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "To Do 1", completed: false },
    { id: 2, title: "To Do 2", completed: false },
    { id: 3, title: "To Do 3", completed: false },
    { id: 4, title: "To Do 4", completed: false },
  ]);

  const [input, setInput] = useState("");

  const createTodo = () => {
    if (!input.trim()) return;

    navigate("/createtodo", {
      state: { title: input },
    });

    setInput("");
  };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      
      {/* Header */}
      <div className="flex flex-row justify-between">
        <div className="py-2 px-4">
          <img src={logo} alt="Logo" />
        </div>

        <Link to="/">
          <button className="bg-[#D6A99D] text-black py-2 px-3 mr-2 mt-4 rounded-xl shadow hover:opacity-90 transition">
            LogOut
          </button>
        </Link>
      </div>

      {/* Title */}
      <div>
        <h1 className="px-8 text-2xl font-bold">TO DO LIST</h1>
        <span className="flex items-center px-8">
          <span className="h-px w-80 bg-black"></span>
        </span>
      </div>

      {/* Input + ADD BUTTON MOVED HERE */}
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
        <InputFieldList tasks={tasks} setTasks={setTasks} />
      </div>

    </div>
  );
}
