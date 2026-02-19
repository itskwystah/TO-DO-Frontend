// Libraries
import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Assets
import logo from "@/assets/logo.png";

// Icons
import { IoIosLock } from "react-icons/io";

// API
import { verifyForgotPasswordOtpApi, resendForgotPasswordOtpApi } from "@/api/auth/auth.api";

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email || "";

  const [code, setCode] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await verifyForgotPasswordOtpApi(email, otp);

      // Navigate to create new password page
      navigate("/createnewpassword", { state: { email, otp } });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to verify OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      setError("");

      await resendForgotPasswordOtpApi(email);

      alert("OTP resent successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to resend OTP");
      }
    } finally {
      setResendLoading(false);
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
        <div className="text-gray-600 mb-2">
          <IoIosLock className="w-12 h-12 mt-0 mb-5" />
        </div>

        <p className="text-gray-700 font-medium mb-4">Enter the 6-digit code sent to your email</p>

        {/* 6-digit code inputs */}
        <div className="flex gap-2 mb-4">
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

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
          className="bg-[#D3B7A2] w-full py-2 rounded text-white font-medium mb-2 hover:opacity-80 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend */}
        <p className="text-xs text-gray-500 mt-2">
          Didn’t receive the code?{" "}
          <span
            className="underline text-red-400 cursor-pointer"
            onClick={handleResend}
          >
            {resendLoading ? "Sending..." : "Resend"}
          </span>
        </p>
      </div>
    </div>
  );
}
