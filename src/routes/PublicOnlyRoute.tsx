import { Navigate, Outlet } from "react-router-dom";
import { useTokenStore } from "@/store/token/token.store";

export default function PublicOnlyRoute() {
    const token = useTokenStore((s) => s.accessToken);

    if (token) {
        return <Navigate to="/todos" replace />;
    }

    return <Outlet />
}