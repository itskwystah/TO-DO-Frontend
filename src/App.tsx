import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

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

  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
