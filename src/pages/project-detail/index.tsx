import { Navigate } from "react-router-dom";

import GlobalLayout from "@/components/layout/global-layout";

import useAuthStore from "@/models/auth";

import { ROUTE_MAP } from "@/data/routes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Board from "./components/board";

export default function ProjectDetail() {
  const { isAuth } = useAuthStore();

  // TODO: Need to create a global component then wrap this login inside
  if (!isAuth) {
    return <Navigate to={ROUTE_MAP.AUTH.LOGIN} replace />;
  }

  return (
    <GlobalLayout>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </GlobalLayout>
  );
}
