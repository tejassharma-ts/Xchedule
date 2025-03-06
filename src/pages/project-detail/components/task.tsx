import Heading from "@/components/ui/heading";
import Para from "@/components/ui/para";
import UserGlance from "@/components/user-glance";

import useBoardStore, { List, Task as SingleTask } from "@/models/board";
import useDialogStore from "@/models/task-dialog";

import { cn } from "@/lib/utils";
import { useDrag, useDrop } from "react-dnd";

import AddList from "./add-list";
import { ITEM_TYPE } from "./constant";

type TaskProps = {
  task: SingleTask;
  listId: string;
  idx: number;
};
export default function Task({ task, listId, idx }: TaskProps) {
  const { setCurrentTask } = useDialogStore();
  const reorderCard = useBoardStore((state) => state.reorderCard);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE.CARD,
    item: { id: task.id, listId, idx },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE.CARD,
    hover: (draggedItem) => {
      if (draggedItem.listId === listId && draggedItem.idx !== idx) {
        reorderCard({
          listId,
          dragIndex: draggedItem.idx,
          hoverIndex: idx,
        });
        draggedItem.idx = idx; // updating index after reordering
      }
    },
  });

  const usersIDs = task?.assignedUsers ?? [];
  return (
    <div
      onClick={() => {
        setCurrentTask(task);
      }}
      ref={(node) => drag(drop(node))}
      className={cn(
        "px-3 py-2 border text-white rounded-md cursor-pointer transition-shadow hover:border-white/50 hover:shadow-md space-y-1 duration-1000",
        isDragging && "opacity-50",
      )}>
      <Heading variant="bold">{task.title}</Heading>
      <Para className="font-normal">{task.desc}</Para>

      {usersIDs.length ? <UserGlance usersIDs={usersIDs} className="!mt-4" /> : null}
    </div>
  );
}
