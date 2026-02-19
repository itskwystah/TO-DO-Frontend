// Libraries
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Assets 
import logo from "@/assets/logo.png";

// Components
import InputField from "@/components/InputField";

// Icons
import { IoIosLock } from "react-icons/io";
import { FiSend } from "react-icons/fi";

// API
import { resetPasswordApi } from "@/api/auth/auth.api";

export default function CreateNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = (location.state as { email: string; otp: string }) || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if email or otp is missing
  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgotpassword", { replace: true });
    }
  }, [email, otp, navigate]);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call backend API to reset password
      await resetPasswordApi(email, otp, password);

      alert("Password reset successfully!");
      navigate("/loginpage", { replace: true }); // Redirect to login page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />

      <div className="bg-[#FBF3D5] p-8 rounded-2xl shadow-md w-80 flex flex-col justify-center items-center">      
        <IoIosLock className="w-12 h-12 mb-5" />

        <div className="flex items-center mb-4 w-full">
          <div className="h-px flex-1 bg-gray-300"></div>
          <div className="shrink-0 px-4 text-gray-900 font-medium">Create New Password</div>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <form className="flex flex-col justify-center space-y-4 w-full">
          <InputField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#D6A99D] text-black py-2 rounded-3xl shadow hover:opacity-90 transition px-4 mt-5 flex items-center justify-center gap-2 w-full"
        >
          <FiSend />
          {loading ? "Saving..." : "Create New Password"}
        </button>
      </div>
    </div>
  );
}
