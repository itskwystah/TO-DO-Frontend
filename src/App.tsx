// Libraries
import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/todo/DashboardPage";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import Createnewpassword  from "./pages/auth/Createnewpassword";

function Home() {
  return (
    <div>
      <h1 className="text-blue-500">Hello World!</h1>
    </div>
  );
}



export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: LandingPage,
    },
    {
      path: "/Home",
      Component: Home,
    },
     {
      path: "/loginpage",
      Component:LoginPage
    },
    {
      path: "/dashboardpage",
      Component:DashboardPage
    },
    {
      path: "/register",
      Component:Register
    },
    {
      path: "/forgotpassword",
      Component:ForgotPassword
    },
    {
      path: "/verifycode",
      Component:VerifyCode
    },
    {
      path: "/createnewpassword",
      Component:Createnewpassword
    },

  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
