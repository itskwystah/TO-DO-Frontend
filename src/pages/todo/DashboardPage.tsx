// Libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "@/store/todo/todo.store";

// Components
import InputFieldList from "@/components/InputFieldList";

// Modals
import SignOutModal from "@/pages/todo/modals/Signoutmodal";
import FilterModal from "@/pages/todo/modals/filterModal";

// Icons
import { IoFilter } from "react-icons/io5";

// Assets
import logo from "@/assets/Logo2.png";
import { RiUserShared2Fill } from "react-icons/ri";

type FilterType = "all" | "pending" | "completed";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { todos, loading, getTodos, updateTodo } = useTodoStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loadingToggle, setLoadingToggle] = useState<string | null>(null);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const createTodo = () => navigate("/createtodo");

  const toggleTask = async (taskId: string) => {
    const task = todos.find((t) => t._id === taskId);
    if (!task) return;

    setLoadingToggle(taskId);
    await updateTodo(taskId, { completed: !task.completed });
    setLoadingToggle(null);
  };

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
    <div className="bg-[#9CAFAA] h-screen flex flex-col rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 shrink-0">
        <div className="py-2 px-3">
          <img src={logo} alt="Logo2" />
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="text-black hover:opacity-80 transition -mt-38 cursor-pointer "
        >
          <RiUserShared2Fill size={26} />
        </button>
      </div>

      {/* Title & Filter */}
      <div className="px-8 shrink-0 -mt-17">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">TO DO LIST</h1>

          <IoFilter
            size={24}
            className="cursor-pointer hover:opacity-70"
            onClick={() => setShowFilter(true)}
          />
        </div>

        <div className="h-px bg-black mt-2 w-full"></div>
      </div>

      {/* Add Task */}
      <div className="px-8 mt-6 shrink-0">
        <button
          onClick={createTodo}
          className="w-full py-3 rounded-xl border border-[#E8DFC8] shadow-lg hover:opacity-90 transition"
        >
          ADD NEW TASK
        </button>
      </div>

      {/* Scrollable Task List */}
      <div
        className="flex-1 min-h-0 overflow-y-auto px-6 mt-5 pb-5
  [&::-webkit-scrollbar]:hidden
  scrollbar-none"
      >
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

      {/* Modals */}
      <SignOutModal show={showMenu} onClose={() => setShowMenu(false)} />

      <FilterModal
        show={showFilter}
        onClose={() => setShowFilter(false)}
        onFilterChange={setFilter}
      />
    </div>
  );
}
