// Assets 
import logo from "@/assets/logo.png";

// Components
import InputField from "@/components/InputField";

// Icons
import { IoIosLock } from "react-icons/io";
import { FiSend } from "react-icons/fi";

export default function ForgotPassword() {
  return (
    <div className="bg-[#9CAFAA] min-h-screen flex-col flex justify-center items-center rounded-3xl">
      <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />
      
      <div className="bg-[#FBF3D5] p-8 rounded-2xl shadow-md w-80 flex flex-col justify-center items-center">      
        <div><IoIosLock className="w-12 h-12 mt-0 mb-5"/></div>
        <div className="flex items-center">
    
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></div>

          <div className="shrink-0 px-4 text-gray-900 ">
            Forgot your password
          </div>

          <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
        </div>

        <form className="flex flex-col justify-center  space-y-4">

          {/* Reusable Input Components */}
          <InputField
            label="Email"
            type="email"
            placeholder="Email Address"
          />
        </form>
            
        
        <button className="bg-[#D6A99D] text-black  py-2 rounded-3xl shadow hover:opacity-90 transition px-4 mt-5 flex items-center justify-center gap-2 ">
          <FiSend />
          <span className="text-sm">Send Email  Verification</span></button>

      </div>
    </div>
  );
}
