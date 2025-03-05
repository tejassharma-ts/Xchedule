import { type Project } from "@/models/board";

import { v4 as uuidv4 } from "uuid";

export const dummyProjects: Project[] = [
  {
    id: "1",
    title: "Project 1",
    desc: "This is a short desc",
    coverImage:
      "https://images.unsplash.com/photo-1733509213080-db2aca1bc244?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    lists: [
      {
        id: uuidv4(),
        title: "To Do",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 1",
            desc: "This is a desc for Task 1.",
            image: "https://via.placeholder.com/150",
            assignedUsers: [
              {
                name: "Tejas",
                email: "tejas@gmail.com",
              },
            ],
          },
          {
            id: uuidv4(),
            title: "Task 4",
            desc: "This is a desc for Task 4.",
            image: "https://via.placeholder.com/150",
            assignedUsers: [
              {
                name: "Sonu",
                email: "sonukuram9211@gmail.com",
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        title: "In Progress",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 2",
            desc: "This task is currently in progress.",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Done",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 3",
            desc: "This task is completed successfully.",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
    ],
  },
];
