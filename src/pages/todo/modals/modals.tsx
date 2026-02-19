import type { ReactNode } from "react";
import { FiLogOut } from "react-icons/fi";
import {
  TiTickOutline,
  TiDeleteOutline,
  TiInfoLargeOutline,

} from "react-icons/ti";

type ModalType =
  | "success-login"
  | "success-added"
  | "confirm-logout"
  | "update-success"
  | "success-deleted";

interface ModalProps {
  show: boolean;
  type: ModalType;
  onClose: () => void;
  onConfirm?: () => void; // for confirm logout and delete
  loading?: boolean;
}

const modalConfig: Record<
  ModalType,
  {
    icon: ReactNode;
    iconColor: string;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
  }
> = {
  "success-login": {
    icon: <TiTickOutline />,
    iconColor: "text-green-600",
    title: "Login Successful",
    description: "You have successfully logged in.",
    showCancel: false,
  },
  "success-added": {
    icon: <TiTickOutline />,
    iconColor: "text-green-600",
    title: "Added Successfully",
    description: "Your task has been added.",
    showCancel: false,
  },
  "confirm-logout": {
    icon: <FiLogOut />,
   iconColor: "text-[#D8444C]",
    title: "Confirm Logout",
    description: "Are you sure you want to logout?",
    confirmText: "Logout",
    cancelText: "Cancel",
    showCancel: true,
  },
  "update-success": {
    icon: <TiInfoLargeOutline />,
    iconColor: "text-green-600",
    title: "Update Successfully",
    description: "Your task has been updated.",
    showCancel: false,
  },
  "success-deleted": {
    icon: <TiDeleteOutline />,
    iconColor: "text-red-600",
    title: "Deleted Successfully",
    description: "The task was deleted successfully.",
    confirmText: "OK",
    cancelText: "Cancel",
    showCancel: false,
  },
};

export default function StatusModal({
  show,
  type,
  onClose,
  onConfirm,
  loading = false,
}: ModalProps) {
  if (!show) return null;

  const config = modalConfig[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#E0E0C6] rounded-3xl p-8 max-w-xs w-full text-center relative shadow-2xl">
        {/* Icon Circle */}
        <div
          className={`mx-auto mb-5 flex items-center justify-center w-20 h-20  ${config.iconColor}`}
        >
          <span className={`text-7xl ${config.iconColor}`}>{config.icon}</span>
        </div>

        <h2 className="text-xl font-semibold mb-2">{config.title}</h2>
        <p className="text-sm text-gray-700 mb-8">{config.description}</p>

        <div className="flex justify-center gap-6">
          {config.showCancel && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
              disabled={loading}
            >
              {config.cancelText}
            </button>
          )}
          <button
            onClick={onConfirm || onClose}
            className={`px-6 py-2 rounded-xl text-white transition ${
              type === "success-deleted"
                ? "bg-[#D8444C] hover:bg-red-500"
                : type === "confirm-logout"
                ? "bg-[#D8444C] hover:bg-red-500"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : config.confirmText || (config.showCancel ? config.confirmText : "OK")}
          </button>
        </div>
      </div>
    </div>
  );
}
