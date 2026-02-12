// Libraries
import { useNavigate } from "react-router-dom";

// Assets
import logo from "@/assets/logo.png";

// Components
import InputField from "@/components/InputField";

export default function LoginPage() {
  const navigate = useNavigate();

  const logIn = () => {
    navigate("/dashboardpage");
  };

  const reg = () => {
    navigate("/register");
  };

  const forgotpass = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col justify-center items-center rounded-3xl">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />

      <div className="bg-[#FBF3D5] p-8 rounded-2xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form className="flex flex-col space-y-4">
          
          {/* Reusable Input Components */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-[10px] ">
            <label className="flex space-x-1">
              <input type="checkbox" className="w-4 h-4 accent-[#D6A99D] rounded-sm"/>
              <span>Remember Me</span>
            </label>

            <span
              onClick={forgotpass}
              className="underline text-[#D6A99D] cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={logIn}
            className="bg-[#D6A99D] text-black font-bold py-2 rounded-xl shadow hover:opacity-90 transition w-full"
          >
            Login
          </button>

          {/* Register Link */}
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
    </div>
  );
}
