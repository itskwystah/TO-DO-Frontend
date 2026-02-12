// Assets
import logo from "@/assets/logo2.png";
import { Link } from "react-router-dom";

// Components
import InputFieldList from "@/components/InputFieldList";

export default function DashboardPage() {
  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      
      {/* Header */}
      <div className="flex flex-row justify-between">
        <div className="py-2 px-4">
          <img src={logo} alt="Logo" />
        </div>

        <Link to="/">
          <button className="bg-[#D6A99D] text-black py-2 px-3 mr-2 mt-4 rounded-xl shadow hover:opacity-90 transition">
            LogOut
          </button>
        </Link>
      </div>

      {/* Title */}
      <div>
        <h1 className="px-8 text-2xl font-bold">TO DO LIST</h1>
        <span className="flex items-center px-8">
          <span className="h-px w-80 bg-black"></span>
        </span>
      </div>

      {/*  Call InputFieldList Component */}
      <div className="px-8 mt-6">
        <InputFieldList />
      </div>

    </div>
  );
}
