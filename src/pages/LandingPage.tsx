import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function LandingPage() {
  //const handleGetStarted = () => {
   // alert("Welcome to TO-DO APPLICATION")
   const navigate = useNavigate();
   const handleGetStarted = () => {
    navigate("/loginpage")
   };
  //};


  return (
    <div className="bg-[#9CAFAA] min-h-screen flex justify-center items-center">
      <img src={logo} alt="Logo" />

      <button onClick={handleGetStarted}className="bg-[#D6A99D] text-black font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition absolute bottom-8">
        Get Started
      </button>
    </div>

  );
}



