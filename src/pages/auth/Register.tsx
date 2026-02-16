// Libraries
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

// Assets
import logo from "@/assets/logo.png";

// Components
import InputField from "@/components/InputField";
import TermsandCondition from "@/pages/auth/components/TermsandCondition"
import { useAuthStore } from "@/store/auth/auth.store";
//import TermsandCondition from "@/components/TermsandCondition";

export default function Register() {
  const { loading, setRegister } = useAuthStore();

    const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form: ", form);
    const success = await setRegister(form);
    if (success) {
      navigate("/loginpage");
    }
  };

  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const logPage = () => {
    navigate("/loginpage");
  };

  // const handleRegister = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!accepted) {
  //     alert("Please agree to the Terms and Conditions first.");
  //     return;
  //   }

  //   // Continue your register logic here
  //   navigate("/loginpage");
  // };

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col justify-center items-center rounded-3xl">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />

      <div className="bg-[#FBF3D5] p-8 rounded-4xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={submitForm} className="flex flex-col space-y-4">
          <InputField 
          label="Username"
          name="name"
           type="text" 
          
           placeholder="Username"   
           onChange={handleChange}
           />


          <InputField
            label="Email"
            name="email"
            type="email"
          
            placeholder="Enter your email"
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
    
            placeholder="Enter your password"
            onChange={handleChange}
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
          />

          {/* Terms Checkbox */}
          <div className="flex items-center justify-between text-[10px]">
            <label className="flex space-x-1 items-center">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-4 h-4 accent-[#D6A99D] rounded-sm"
              />
              <span>
                I agree to the{" "}
                <span
                  onClick={() => setShowTerms(true)}
                  className="underline text-[#D6A99D] cursor-pointer"
                >
                  Terms and Condition
                </span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#D6A99D] text-black py-2 rounded-xl shadow hover:opacity-90 transition w-full"
          >
            {loading ? "Registering.." : "REGISTER"}
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

      {/* Terms Modal */}
      <TermsandCondition
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAgree={() => setAccepted(true)}
      />
    </div>
  );
}
