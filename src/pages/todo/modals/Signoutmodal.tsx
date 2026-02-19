import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa';
import { useAccountStore } from '@/store/account/account.store';
import StatusModal from '@/pages/todo/modals/modals'; // Import StatusModal

interface SignOutModalProps {
  show: boolean;
  onClose: () => void;
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

export default function SignOutModal({
  show,
  onClose,
  onFilterChange,
}: SignOutModalProps) {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const account = useAccountStore((s) => s.account);
  const username = account?.name;

  // Confirm logout handler
  const handleLogoutConfirm = () => {
    setShowConfirmLogout(false);
    onClose(); // close menu
    navigate('/'); // redirect to Landing page
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 flex flex-col rounded-3xl items-center justify-center z-50">
        <div className="bg-[#FBF3D5] rounded-2xl p-6 w-80 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Hello, {username}</h2>
            <button onClick={onClose}>
              <FaTimes className="text-gray-600 hover:text-black" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onFilterChange('all');
                onClose();
              }}
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
            >
              <FaTasks className="text-blue-500" />
              View All Tasks
            </button>

            <button
              onClick={() => {
                onFilterChange('pending');
                onClose();
              }}
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
            >
              <FaClock className="text-yellow-500" />
              Pending Tasks
            </button>

            <button
              onClick={() => {
                onFilterChange('completed');
                onClose();
              }}
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
            >
              <FaCheckCircle className="text-green-500" />
              Completed Tasks
            </button>

            <button
              onClick={() => setShowConfirmLogout(true)} // Show confirm logout modal
              className="flex items-center gap-3 bg-[#D6A99D] hover:opacity-90 p-3 rounded-lg transition w-full"
            >
              <FaSignOutAlt />
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Logout Modal */}
      <StatusModal
        show={showConfirmLogout}
        type="confirm-logout"
        onClose={() => setShowConfirmLogout(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}