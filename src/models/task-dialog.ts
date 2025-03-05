import { create } from "zustand";
import { Task } from "./board";

type DialogState = {
  task: Task;
  open: boolean;
  setOpen: (status: boolean) => void;
  setCurrentTask: (task: Task) => void;
  openDialog: () => void;
  closeDialog: () => void;
};

const useDialogStore = create<DialogState>((set) => ({
  open: false,
  task: null,
  setCurrentTask: (task) =>
    set({
      open: true,
      task,
    }),
  setOpen: (status) => set({ open: status }),
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
}));

export default useDialogStore;
