import { useEffect, useState } from "react";

import useMultiselect from "@/hooks/use-multiselect";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-glance";

import useAuthStore from "@/models/auth";
import useBoardStore, { User } from "@/models/board";
import useDialogStore from "@/models/task-dialog";

import AppError from "@/lib/error";
import { cn, delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// import Heading from "../heading";

export default function TaskDialog() {
  const { open, setOpen, task } = useDialogStore();

  if (!task) return;

  // const users = task?.assignedUsers ?? [];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <TaskForm />

        {/* {users ? ( */}
        {/*   <div className="flex flex-col space-y-3"> */}
        {/*     {users.map((user) => ( */}
        {/*       <div className="space-y-2"> */}
        {/*         <Heading variant="medium">Assigned Users</Heading> */}
        {/*         <div className="mb-4 flex items-center justify-between last:mb-0"> */}
        {/*           <div className="flex flex-col space-y-0.5"> */}
        {/*             <div className="flex space-x-2 items-center"> */}
        {/*               <UserAvatar src={user.image} /> */}
        {/*               <div className="flex flex-col space-y-0 text-xs"> */}
        {/*                 <Heading>{user.name}</Heading> */}
        {/*                 <span className="font-medium">{user.email}</span> */}
        {/*               </div> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     ))} */}
        {/*   </div> */}
        {/* ) : null} */}
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),
  desc: z.string().min(5, "Description must be at least 5 characters").optional(),
  assignedUsers: z.array(z.string()).optional(),
});

export type TaskFormValues = z.infer<typeof formSchema>;

function TaskForm() {
  const [loading, setLoading] = useState(false);

  const { user: authUser, users } = useAuthStore();
  const { task, closeDialog } = useDialogStore();
  const { currentProject, updateTaskOfList } = useBoardStore();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      desc: task.desc,
      assignedUsers: [],
    },
  });

  const selectedUsers = users.filter((user) => task.assignedUsers.includes(user.id));
  const { selectedItems, handleSelectChange, isOptionSelected } = useMultiselect<User>(
    selectedUsers,
    (user) => user.id,
  );

  async function onSubmit(values: TaskFormValues) {
    try {
      setLoading(true);
      await delay(800);

      const userIDs = selectedItems.reduce((acc, user) => {
        const userID = user.id;
        return [...acc, userID];
      }, []);

      // the reason why I'm not storing whole user object is to mimic react world scenerio when interacting with DB
      updateTaskOfList({
        taskID: task.id,
        listID: task.listID,
        projectID: currentProject.id,
        values: {
          ...values,
          assignedUsers: userIDs,
        },
      });

      closeDialog();
    } catch (err) {
      const error = new AppError(err);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title..." {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedUsers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign Users</FormLabel>
              {/* <FormControl> */}
              {/*   <Input placeholder="Enter user name" /> */}
              {/* </FormControl> */}
              {/* list all the users */}
              <div className="flex gap-2 pt-2 flex-wrap">
                {users.map((user) => (
                  <Button
                    type="button"
                    onClick={() => {
                      handleSelectChange(user);
                    }}
                    variant="outline"
                    className={cn(
                      isOptionSelected(user) &&
                        "bg-white hover:bg-white text-black hover:text-black",
                      "rounded-full",
                    )}>
                    {authUser.id === user.id ? "You" : user.name}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button loading={loading} type="submit" className="ml-auto">
          Save Task
        </Button>
      </form>
    </Form>
  );
}
