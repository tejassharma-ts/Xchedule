import { Navigate, Outlet } from "react-router-dom";

import Container from "@/components/layout/container";

import useAuthStore from "@/models/auth";

import { ROUTE_MAP } from "@/data/routes";

export function RequireAuth({ children }) {
  const { isAuth } = useAuthStore();

  return isAuth ? <Navigate to={ROUTE_MAP.HOME} replace /> : children;
}

export default function Auth() {
  return (
    <RequireAuth>
      <div className="h-screen flex justify-center overflow-hidden">
        <div className="w-full mt-[20vh]">
          <Container size="full">
            <Outlet />
          </Container>
        </div>
      </div>
    </RequireAuth>
  );
}
