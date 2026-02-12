
// Assets
import logo from "@/assets/logo2.png";
import { Link } from "react-router-dom";

// Icons
import { FaPlus } from "react-icons/fa6";

export default function DashboardPage() {
  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">
      <div className="flex flex-row justify-between">
        <div className="py-2 px-4">
          <img src={logo} alt="Logo" />
        </div>

        <Link to="/">
          {" "}
          <button className="bg-[#D6A99D] text-black  py-2 px-3 mr-2 mt-4 rounded-xl shadow hover:opacity-90 transition ">
            {" "}
            LogOut
          </button>
        </Link>
      </div>

      <div>
        <h1 className="px-8 text-2xl font-bold">TO DO LIST</h1>
        <span className="flex items-center px-8 ">
          <span className="h-px w-80  bg-black"></span>
        </span>
      </div>

      {/* Input Section for Add Task*/}
      <div className="px-8 mt-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter new task..."
            className="flex-1 px-4 py-2 rounded-xl outline-none bg-[#FBF3D5] border border-gray-300 focus:ring-2 focus:ring-black"
          />

          <button className="bg-[#D6A99D] text-white px-4 py-2 rounded-xl hover:opacity-90 transition whitespace-nowrap flex items-center gap-2">
            <FaPlus />
            Add Task
          </button>
        </div>
      </div>

    {/** List of to-do */}
      <div>



      </div>


    </div>
  );
}
