// Libraries
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

// Assets
import logo from "@/assets/logo.png";

// Icons
import { IoIosLock } from "react-icons/io";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const createnewPass = () => {
    navigate("/createnewpassword");
  };

  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Automatically focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput!.focus();
      }
    }
  };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col justify-center items-center">
      {/* Logo */}
      <div className="bg-[#FEF9E7] w-24 h-24 rounded-full flex items-center justify-center mb-6">
        <img src={logo} alt="Logo" className="w-16 h-16" />
      </div>

      {/* Verification Card */}
      <div className="bg-[#FEF9E7] rounded-2xl w-80 p-6 flex flex-col items-center">
        {/* Lock Icon */}
        <div className="text-gray-600 mb-2">
          <div><IoIosLock className="w-12 h-12 mt-0 mb-5"/></div>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c-1.105 0-2 .895-2 2v2h4v-2c0-1.105-.895-2-2-2zm0-4a4 4 0 014 4v2H8v-2a4 4 0 014-4z"
            />
         
        </div>

        <p className="text-gray-700 font-medium mb-4">Verification Code</p>

        {/* 6-digit code inputs */}
        <div className="flex gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-10 h-10 text-center rounded border border-[#F2E3D5] focus:outline-none focus:ring-2 focus:ring-[#D3B7A2]"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button 
        type="button"
        onClick={createnewPass}
        className="bg-[#D3B7A2] w-full py-2 rounded text-white font-medium mb-2">
          Verify
        </button>

        {/* Resend */}
        <p className="text-xs text-gray-500">
          Didn’t receive the code?{" "}
          <span className="underline text-red-400 cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
}
