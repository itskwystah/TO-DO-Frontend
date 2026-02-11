import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import InputField from "@/components/InputField";

export default function Register() {
  const navigate = useNavigate();

  const logPage = () => {
    navigate("/loginpage");
  };


  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />

      <div className="bg-[#FBF3D5] p-8 rounded-4xl shadow-md w-80 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form className="flex flex-col space-y-4">
          {/* Reusable Input Components */}
          <InputField label="Username" type="username" placeholder="Username" />

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

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Enter your password"
          />

          {/* Register Link */}
          <div className="flex items-center justify-between text-[10px]">
            <label className="flex space-x-1">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#D6A99D] rounded-sm"
              />
              <span className="text-[10px]">
                I agree to the{" "}
                <span className="underline text-[#D6A99D] cursor-pointer">
                  Terms and Condition
                </span>
              </span>
            </label>
          </div>

          <button
            className="bg-[#D6A99D] text-black  py-2 rounded-xl shadow hover:opacity-90 transition w-full"
          > 
            REGISTER
          </button>

          <div className="flex justify-center text-[10px] space-x-1">
            <span>Already have an account?</span>
            <span
            onClick={logPage}
              className="underline text-[#D6A99D] cursor-pointer"
            >
              Login
            </span>
          </div>

        </form>
      </div>
    </div>
  );
}
