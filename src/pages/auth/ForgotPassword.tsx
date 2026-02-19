// Libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendForgotPasswordOtpApi } from "@/api/auth/auth.api"; // create this API function

// Icons
import { FiSend } from "react-icons/fi";
import { IoIosLock } from "react-icons/io";


// Assets
import logo from "@/assets/logo.png";

// Components
import InputField from "@/components/InputField";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call backend to send OTP
      const res = await sendForgotPasswordOtpApi(email.trim().toLowerCase());
      console.log(res.message);

      // Navigate to verify code page and pass email as state
      navigate("/verifycode", { state: { email: email.trim().toLowerCase() } });
    } catch (err: unknown) {
      // Type guard for Axios error
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to send OTP");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex-col flex justify-center items-center rounded-3xl">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />

      <div className="bg-[#FBF3D5] p-8 rounded-2xl shadow-md w-80 flex flex-col justify-center items-center">
        <div>
          <IoIosLock className="w-12 h-12 mt-0 mb-5" />
        </div>

        <div className="flex items-center w-full mb-4 -mt-5">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></div>
          <div className="shrink-0 px-4 text-gray-700 text-[14px] font-medium">
            Forgot your password
          </div>
          <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
        </div>

        <form className="flex flex-col justify-center space-y-4 w-full">
          {/* Reusable Input Component */}
          <InputField
            label="Email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <button
          type="button"
          onClick={handleSendOtp}
          disabled={loading}
          className="bg-[#D6A99D] text-black py-2 rounded-3xl shadow hover:opacity-90 transition px-4 mt-5 flex items-center justify-center gap-2"
        >
          <FiSend />
          <span className="text-sm">
            {loading ? "Sending..." : "Send Email Verification"}
          </span>
        </button>
      </div>
    </div>
  );
}
