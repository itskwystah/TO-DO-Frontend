import { Navigate, Outlet } from "react-router-dom";
import { useTokenStore } from "@/store/token/token.store";

export default function ProtectedRoute() {
  const token = useTokenStore((s) => s.accessToken);

  if (!token) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
}
