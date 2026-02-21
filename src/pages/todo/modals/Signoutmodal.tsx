import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useAccountStore } from "@/store/account/account.store";
import StatusModal from "@/pages/todo/modals/modals";

interface SignOutModalProps {
  show: boolean;
  onClose: () => void;
}

export default function SignOutModal({
  show,
  onClose,
}: SignOutModalProps) {
  const navigate = useNavigate();
  const account = useAccountStore((s) => s.account);
  const username = account?.name ?? "User";

  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogoutConfirm = () => {
    setShowConfirmLogout(false);
    onClose();
    navigate("/");
  };

  if (!show) return null;

  return (
    <>
      {/* Dropdown Card */}
      <div className="absolute right-0 mt-3 w-72 bg-[#FBF3D5] rounded-2xl p-6 shadow-xl z-50">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            Hello, {username}
          </h2>

          <button onClick={onClose}>
            <FaTimes className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowConfirmLogout(true)}
          className="flex items-center justify-center gap-3 bg-[#D6A99D] hover:opacity-90 p-3 rounded-lg transition w-full font-medium"
        >
          <FaSignOutAlt />
          Log Out
        </button>
      </div>

      {/* Confirm Logout Modal (still centered intentionally) */}
      <StatusModal
        show={showConfirmLogout}
        type="confirm-logout"
        onClose={() => setShowConfirmLogout(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}