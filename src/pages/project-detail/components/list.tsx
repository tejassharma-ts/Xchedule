import Heading from "@/components/ui/heading";

import useBoardStore, { type List } from "@/models/board";

import { useDrop } from "react-dnd";

import AddList from "./add-list";
import AddTask from "./add-task";
import { ITEM_TYPE } from "./constant";
import Task from "./task";

type ListProps = {
  list: List;
};
export default function List({ list }: ListProps) {
  const { currentProject, moveCard } = useBoardStore();

  const [, drop] = useDrop({
    accept: ITEM_TYPE.CARD,
    drop: (item) => {
      if (item.listId !== list.id) {
        moveCard({
          cardId: item.id,
          sourceListId: item.listId,
          targetListId: list.id,
        });
      }
    },
  });

  return (
    <div
      ref={drop}
      data-cy="single-list"
      className="w-96 p-4 flex flex-col space-y-4 border rounded-lg flex-shrink-0 self-start">
      <Heading size="base" variant="bold">
        {list.title}
      </Heading>
      <div className="space-y-2">
        {list.tasks.map((task, idx) => (
          <Task key={task.id} task={task} listId={list.id} idx={idx} />
        ))}
        <AddTask ID={list.id} />
      </div>
    </div>
  );
}
