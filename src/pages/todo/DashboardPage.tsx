// Libaries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "@/store/todo/todo.store";

// Components
import InputFieldList from "@/components/InputFieldList";

// Modals
import SignOutModal from "@/pages/todo/modals/Signoutmodal";

// Icons
import { FaBars } from "react-icons/fa";

// Assets
import logo from "@/assets/Logo2.png";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { todos, loading, getTodos, updateTodo } = useTodoStore();

  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] =
    useState<"all" | "pending" | "completed">("all");
  const [loadingToggle, setLoadingToggle] = useState<string | null>(null);

  // Fetch Task
  useEffect(() => {
    getTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation
  const createTodo = () => navigate("/createtodo");

  // Toogle
  const toggleTask = async (taskId: string) => {
    const task = todos.find((t) => t._id === taskId);
    if (!task) return;

    const newCompleted = !task.completed;

    setLoadingToggle(taskId);

    // Optimistic UI update
    await updateTodo(taskId, { completed: newCompleted });

    setLoadingToggle(null);
  };

  //Filter
  const filteredTasks = todos
    .filter((task) => {
      if (filter === "pending") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
    }));

  return (
    <div className="bg-[#9CAFAA] h-screen flex flex-col rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="py-2 px-3">
          <img src={logo} alt="Logo2" />
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="text-black hover:opacity-80 transition -mt-38 cursor-pointer"
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Title */}
      <div className="px-8 -mt-20">
        <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>
        <div className="h-px bg-black mt-1 w-full max-w-260px" />
      </div>

      {/* Add Task Button */}
      <div className="px-8 mt-6">
        <button
          onClick={createTodo}
          className="w-full text-black py-3 rounded-xl border border-[#E8DFC8] shadow-lg hover:opacity-90 transition cursor-pointer"
        >
           ADD NEW TASK
        </button>
      </div>

      {/* Task List */}
      <div className="px-6 mt-5 flex-1">
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <InputFieldList
            tasks={filteredTasks}
            onToggle={toggleTask}
            loadingToggle={loadingToggle}
          />
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
