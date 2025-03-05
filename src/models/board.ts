import { TaskFormValues } from "@/components/ui/custom/task-dialog";

import { ProjectFormSchema } from "@/pages/dashboard/components/add-project";
import { AddListSchema } from "@/pages/project-detail/components/add-list";
import { AddTaskSchema } from "@/pages/project-detail/components/add-task";
import { dummyProjects } from "@/site/projects";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import useAuthStore from "./auth";

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type Task = {
  id: string;
  title: string;
  desc: string;
  image: string;
  assignedUsers: string[];
  listID: string;
};

export type List = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  coverImage: string;
  lists: List[];
  createdBy: string; // user uuid
};

type BoardStore = {
  currentProject: Project | null;
  projects: Project[];
  moveCard: ({
    cardId,
    sourceListId,
    targetListId,
  }: {
    cardId: string;
    sourceListId: string;
    targetListId: string;
  }) => void;
  reorderCard: ({
    listId,
    dragIndex,
    hoverIndex,
  }: {
    listId: string;
    dragIndex: number;
    hoverIndex: number;
  }) => void;
  addListToProject: ({ ID, values }: { ID: string; values: z.infer<typeof AddListSchema> }) => void;
  addTaskToList: ({
    listID,
    projectID,
    values,
  }: {
    listID: string;
    projectID: string;
    values: z.infer<typeof AddTaskSchema>;
  }) => void;
  updateTaskOfList: ({
    taskID,
    listID,
    projectID,
    values,
  }: {
    taskID: string;
    listID: string;
    projectID: string;
    values: TaskFormValues;
  }) => void;
  addProject: (values: z.infer<typeof ProjectFormSchema>) => void;
  setCurrentProject: (ID: string) => void;
};

// Zustand store
const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      currentProject: null,
      projects: [],

      moveCard: ({ cardId, sourceListId, targetListId }) =>
        set((state) => {
          const project = state.projects.find((p) => p.id === state.currentProject?.id);
          if (!project) return state;

          const sourceList = project.lists.find((list) => list.id === sourceListId);
          const targetList = project.lists.find((list) => list.id === targetListId);
          if (!sourceList || !targetList) return state;

          const movedCard = sourceList.tasks.find((card) => card.id === cardId);
          if (!movedCard) return state;

          sourceList.tasks = sourceList.tasks.filter((card) => card.id !== cardId);
          targetList.tasks.push(movedCard);

          return { projects: [...state.projects] };
        }),

      reorderCard: ({ listId, dragIndex, hoverIndex }) =>
        set((state) => {
          const project = state.projects.find((p) => p.id === state.currentProject?.id);
          if (!project) return state;

          const list = project.lists.find((l) => l.id === listId);
          if (!list) return state;

          const updatedCards = [...list.tasks];
          const [movedCard] = updatedCards.splice(dragIndex, 1);
          updatedCards.splice(hoverIndex, 0, movedCard);

          list.tasks = updatedCards;

          return { projects: [...state.projects] };
        }),

      addListToProject({ ID, values }) {
        const newList: List = {
          id: uuidv4(),
          title: values.title,
          tasks: [],
        };

        console.log("wtf");
        const updatedProjects = get().projects.map((project) => {
          if (project.id === ID) {
            return {
              ...project,
              lists: [...project.lists, { ...newList }],
            };
          } else return project;
        });

        set({ projects: updatedProjects });
      },

      // will insert a new task to a specific list of a specific project
      addTaskToList: ({ listID, projectID, values }) => {
        const newTask: Task = {
          id: uuidv4(),
          title: values.title,
          desc: "",
          image: "",
          assignedUsers: [],
          listID,
        };

        // this method directly modifies the references it works but nah, will go with immutable way

        // const currentProject = get().projects.find((project) => project.id === projectID);
        // const updatedList = currentProject.lists.find((list) => list.id === listID);
        // updatedList.tasks.push(newTask);
        //
        // const updatedProjects = get().projects.map((project) => {
        //   if (project.id === projectID) {
        //     return currentProject;
        //   }
        //   return project;
        // });
        //
        // set({ projects: updatedProjects });

        const updatedProjects = get().projects.map((project) => {
          if (project.id !== projectID) return project;

          // get the target list
          const updatedLists = project.lists.map((list) => {
            if (list.id !== listID) return list;

            // update the list
            return {
              ...list,
              tasks: [...list.tasks, newTask],
            };
          });

          return {
            ...project,
            lists: updatedLists,
          };
        });

        set({ projects: updatedProjects });
      },

      updateTaskOfList: ({ taskID, listID, projectID, values }) => {
        const updatedProjects = get().projects.map((project) => {
          if (project.id !== projectID) return project;

          const updatedLists = project.lists.map((list) => {
            if (list.id !== listID) return list;

            return {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskID) {
                  return {
                    ...task,
                    ...values,
                  };
                }
                return task;
              }),
            };
          });

          return {
            ...project,
            lists: updatedLists,
          };
        });

        set({ projects: updatedProjects });
      },

      addProject: (values) => {
        const newProject: Project = {
          id: uuidv4(),
          title: values.title,
          desc: values.desc,
          coverImage: values.coverImage,
          lists: [],
          createdBy: useAuthStore.getState().user.id,
        };
        const updatedProjects = [...get().projects, newProject];
        set({ projects: updatedProjects });
      },

      setCurrentProject: (ID) => {
        set({ currentProject: getProjectByID(ID) });
      },
    }),
    {
      name: "main-state",
    },
  ),
);

export function getProjectByID(ID: string): Project | undefined {
  return useBoardStore.getState().projects.find((project) => project.id === ID);
}

export default useBoardStore;
