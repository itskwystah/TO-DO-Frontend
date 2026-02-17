// Libraries
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/auth.store";
import { useState, type ChangeEvent, type FormEvent } from "react";

// Assets
import logo from "@/assets/logo.png";
import type { AcctType } from "@/types/account/account.type";

// Components
import InputField from "@/components/InputField";
import StatusModal from "@/pages/todo/components/modals"; // Import modal

export default function LoginPage() {
  const loading = useAuthStore((state) => state.loading);
  const setLogin = useAuthStore((state) => state.setLogin);

  const [form, setForm] = useState<Partial<AcctType>>({
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    const success = await setLogin(form);
    if (success) {
      setShowSuccessModal(true); // Show modal on login success
    }
  };

  // Close modal and redirect to dashboard
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboardpage"); // Redirect after clicking OK in login successfully
  };

  const reg = () => navigate("/register");
  const forgotpass = () => navigate("/forgotpassword");

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col justify-center items-center rounded-3xl">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />

      <div className="bg-[#FBF3D5] p-8 rounded-2xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={submitForm} className="flex flex-col space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />

          <div className="flex items-center justify-between text-[10px]">
            <label className="flex space-x-1">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#D6A99D] rounded-sm"
              />
              <span>Remember Me</span>
            </label>

            <span
              onClick={forgotpass}
              className="underline text-[#D6A99D] cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#D6A99D] text-black font-bold py-2 rounded-xl shadow hover:opacity-90 transition w-full cursor-pointer"
          >
            {loading ? "logging in.." : "LOGIN"}
          </button>

          <div className="flex justify-center text-[10px] space-x-1">
            <span>Don't have an account?</span>
            <span
              onClick={reg}
              className="underline text-[#D6A99D] cursor-pointer"
            >
              Register
            </span>
          </div>
        </form>
      </div>

      {/* Success Login Modal */}
      <StatusModal
        show={showSuccessModal}
        type="success-login"
        onClose={handleModalClose} // Redirects to dashboard after clicking OK
      />
    </div>
  );
}
