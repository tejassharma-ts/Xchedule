import GlobalLayout from "@/components/layout/global-layout";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Board from "./components/board";

export default function ProjectDetail() {
  return (
    <GlobalLayout>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </GlobalLayout>
  );
}
