// Libraries
import { useNavigate } from "react-router-dom";

// Assets
import logo from "@/assets/logo.png";

export default function LandingPage() {

  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/loginpage");
  };
  

  return (
    <div className="bg-[#9CAFAA] min-h-screen flex justify-center items-center rounded-3xl">
      <img src={logo} alt="Logo" className="top" />

      <button
        onClick={handleGetStarted}
        className="bg-[#D6A99D] text-black font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition absolute bottom-8"
      >
        Get Started
      </button>
    </div>
  );
}
