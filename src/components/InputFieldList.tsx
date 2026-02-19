import { useState } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axios/axios-instance";
import { TiDeleteOutline, TiTickOutline } from "react-icons/ti";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

interface InputFieldListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  loadingToggle?: string | null;
}

const InputFieldList = ({
  tasks,
  onToggle,
  loadingToggle,
}: InputFieldListProps) => {
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const openDeleteModal = (id: string) => {
    setTaskToDelete(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      setLoadingDelete(true);
      await axiosInstance.delete(`/todos/${taskToDelete}`);

      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);

    // Redirect to dashboard
    navigate("/dashboardpage");

    // Force refresh to reload updated tasks
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="mt-6">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={task.completed}
            disabled={loadingToggle === task.id}
            onChange={() => onToggle(task.id)}
            className="w-4 h-4 accent-black cursor-pointer"
          />

          <div className="flex justify-between items-center bg-[#FBF3D5] flex-1 rounded-xl px-4 py-3 shadow-sm">
            {/* Title */}
            <div className="flex-1 min-w-0">
              <span
                className={`text-sm block ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>

              {/* Task description */}
              {task.description && (
                <p className={`text-[10px] text-gray-600 mt-0.5 `}>
                  {task.description}
                </p>
              )}
              {/* time and date */}
              {task.createdAt && (
                <p className="text-[8px] text-gray-400 mt-1">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Edit & Delete Buttons */}
            <div className="flex gap-3 ml-4">
              <FaRegEdit
                className="text-gray-500 cursor-pointer"
                onClick={() => navigate(`/updatetodo/${task.id}`)}
              />
              <FaTrash
                className="text-[#D8444C] cursor-pointer"
                onClick={() => openDeleteModal(task.id)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#E0E0C6] rounded-3xl p-8 max-w-xs w-full text-center shadow-lg">
            <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full text-[#D8444C] text-7xl">
              <TiDeleteOutline />
            </div>

            <h2 className="text-lg font-semibold mb-2">Delete Task?</h2>
            <p className="text-sm text-gray-700 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={closeConfirmModal}
                className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={loadingDelete}
                className="px-6 py-2 rounded-xl bg-[#D8444C] text-white hover:bg-red-600 transition"
              >
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Delete Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#E0E0C6] rounded-3xl p-8 max-w-xs w-full text-center shadow-lg">
            <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full text-green-600 text-7xl">
              <TiTickOutline />
            </div>

            <h2 className="text-lg font-semibold mb-2">Deleted Successfully</h2>
            <p className="text-sm text-gray-700 mb-6">
              The task was deleted successfully.
            </p>

            <button
              onClick={handleSuccessClose}
              className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputFieldList;
