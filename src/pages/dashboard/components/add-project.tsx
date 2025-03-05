import { useState } from "react";

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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

import useBoardStore from "@/models/board";

import AppError from "@/lib/error";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ProjectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),
  desc: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must be less than 200 characters")
    .trim(),
  coverImage: z.string().url("Enter a valid image URL"),
});

export default function AddProject() {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Add Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <ProductForm setOpen={setOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

type ProductForm = {
  setOpen: (value: boolean) => void;
};
export function ProductForm({ setOpen }: ProductForm) {
  const [loading, setLoading] = useState(false);

  const { addProject } = useBoardStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      desc: "",
      coverImage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProjectFormSchema>) {
    try {
      setLoading(true);
      await delay(500);
      addProject(values);
      toast.success("Project created successfully!");
      setOpen(false);
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
                <Input placeholder="Project title..." {...field} autoFocus />
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
                <Textarea placeholder="Enter project description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter image URL..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setImagePreview(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {imagePreview && (
          <div className="mt-2 max-h-52">
            <img
              src={imagePreview}
              alt="Cover Preview"
              className="object-cover rounded-lg shadow h-full w-full"
            />
          </div>
        )}

        <div className="self-end space-x-4">
          <Button disabled={loading} onClick={() => setOpen(false)} type="button" variant="ghost">
            Cancel
          </Button>

          <Button disabled={loading} loading={loading} type="submit">
            Save Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
