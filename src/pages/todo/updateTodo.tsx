// Libraries
import { Link, } from "react-router-dom";

// Assets
import logo from "@/assets/Logo2.png";


export default function UpdateTodo() {


  return (
    <div className="bg-[#9CAFAA] min-h-screen flex flex-col rounded-3xl">

      {/* Mobile Card Container */}
      <div className="w-375px h-812px bg-[#9CAFAA] rounded-[40px] px-6 py-6 flex flex-col ">

        {/* Header */}
        <div className="flex flex-row justify-between">
        <div className="py-2 px-4">
          <img src={logo} alt="Logo2" />
        </div>

        <Link to="/">
          <button className="bg-[#D6A99D] text-black py-2 px-3 mr-2 mt-4 rounded-xl shadow hover:opacity-90 transition">
            LogOut
          </button>
        </Link>
      </div>

        {/* Title */}
        <div className="mt-10 px-2">
          <h1 className="text-2xl font-bold tracking-wide">
            TO DO LIST
          </h1>
          <span className="flex items-center ">
          <span className="h-px w-80 bg-black"></span>
        </span>
          <div className="h-1px bg-black w-64 mt-2"></div>
        </div>

        {/* Form */}
        <div className="mt-10 flex flex-col gap-6 px-2">
          
          {/* Title Field */}
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-2 border border-black 
                         focus:outline-none focus:ring-2  focus:ring-gray-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              rows={6}
              placeholder="Description"
              className="w-full bg-[#E8DFC8] rounded-xl px-4 py-3 border border-black 
                          focus:outline-none focus:ring-2   focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto flex flex-col gap-3 px-2 ml-auto">
          
          <Link to = "/dashboardpage">
          <button className="bg-[#E5E5E5] px-6 py-2 rounded-xl border border-black shadow-md hover:opacity-90 transition">
             UPDATE TASK
          </button>
          </Link>
          

          <Link to="/dashboardpage">
            <button className="bg-[#E5E5E5] px-6 py-2 rounded-xl border border-black shadow-md hover:opacity-90 transition">
              &lt; BACK
            </button>
          </Link>

        </div>

      </div>
 </div>
  );
}
