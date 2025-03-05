import { useState } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useBoardStore from "@/models/board";

import AppError from "@/lib/error";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export default function AddTask({ ID }: { ID: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentProject, addTaskToList } = useBoardStore();

  const form = useForm<z.infer<typeof AddTaskSchema>>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: { title: "" },
  });

  async function onSubmit(values: z.infer<typeof AddTaskSchema>) {
    try {
      setLoading(true);
      await delay(500);
      addTaskToList({ listID: ID, projectID: currentProject.id, values });
      setIsAdding(false);
      form.reset();
    } catch (err) {
      const error = new AppError(err);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {isAdding ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-1 space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter a title..." {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button disabled={loading} type="submit" loading={loading}>
                Add Task
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsAdding(false);
                  form.reset();
                }}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Button variant="ghost" onClick={() => setIsAdding(true)}>
          <Icons.add size={16} className="mr-2" />
          Add Task
        </Button>
      )}
    </div>
  );
}
