import { useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputField({ label, type, ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isEmail = type === "email";

  return (
    <div className="flex flex-col space-y-0">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          {...props}
          className={`w-full border border-[#D6A99D] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D6A99D] ${
            isPassword || isEmail ? "pr-10" : ""
          }`}
        />

        {isEmail && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <TfiEmail />
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <ImEyeBlocked /> : <ImEye />}
          </button>
        )}
      </div>
    </div>
  );
}
