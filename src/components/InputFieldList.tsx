import { useState } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface InputFieldListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const InputFieldList = ({ tasks, setTasks }: InputFieldListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Open Modal
  const openDeleteModal = (id: number) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (taskToDelete !== null) {
      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
    }
    setShowModal(false);
    setTaskToDelete(null);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="mt-6 relative">
      {/* Task List */}
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="w-4 h-4 accent-black"
          />

          <div className="flex justify-between items-center bg-[#FBF3D5] flex-1 rounded-xl px-4 py-3 shadow-sm">
            <span
              className={`text-sm ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>

            <div className="flex gap-3">
              <FaRegEdit className="text-gray-500 cursor-pointer" />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => openDeleteModal(task.id)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-[#EDE7CF] max-w-md w-full rounded-[40px] p-8 text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full border-8 border-red-500 flex items-center justify-center">
                <span className="text-red-500 text-4xl font-bold">✕</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-3">Are you sure?</h2>

            <p className="text-gray-700 text-sm mb-8 leading-relaxed">
              Do you really want to delete this task? This process cannot be undone.
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-300 border border-black hover:opacity-90 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-6 py-2 rounded-xl bg-red-500 text-black border border-black hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputFieldList;
