import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "CARD";

const Card = ({ card, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 bg-white rounded shadow mb-2 ${isDragging ? "opacity-50" : ""}`}
    >
      {card}
    </div>
  );
};

const List = ({ title, cards, index, moveCard }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => moveCard(item.index, index),
  });

  return (
    <div ref={drop} className="p-4 bg-gray-200 w-60 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {cards.map((card, i) => (
        <Card key={i} card={card} index={i} moveCard={moveCard} />
      ))}
    </div>
  );
};

const Board = () => {
  const [lists, setLists] = useState([
    { title: "To Do", cards: ["Task 1", "Task 2"] },
    { title: "In Progress", cards: ["Task 3"] },
    { title: "Done", cards: ["Task 4"] },
  ]);

  const moveCard = (cardIndex, targetListIndex) => {
    const sourceListIndex = lists.findIndex((list) =>
      list.cards.includes(lists[targetListIndex].cards[cardIndex]),
    );

    if (sourceListIndex === -1) return;

    const newLists = [...lists];
    const [movedCard] = newLists[sourceListIndex].cards.splice(cardIndex, 1);
    newLists[targetListIndex].cards.push(movedCard);
    setLists(newLists);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4">
        {lists.map((list, index) => (
          <List key={index} {...list} index={index} moveCard={moveCard} />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;
