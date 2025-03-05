import { ScrollRestoration, useLocation } from "react-router-dom";

import { ROUTE_MAP } from "@/data/routes";

import Navbar from "../shared/navbar";
import PageContainer from "./page-container";

export default function GlobalLayout({ children }) {
  const location = useLocation();

  const isAuthPage = [ROUTE_MAP.AUTH.LOGIN, ROUTE_MAP.AUTH.REGISTER].includes(location.pathname);

  return (
    <main className="h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      {isAuthPage ? { children } : <PageContainer>{children}</PageContainer>}
      <ScrollRestoration />
    </main>
  );
}
