"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingIcon from "@/app/_components/common/LoadingIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/actions";
import { updateProfileSchema } from "@/lib/validator/updateProfileSchema.";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

// Define schema for the form validation

interface ProfileFormProps {
  user: User;
}

export default function UpdateProfile({ user }: ProfileFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user.name?.split(" ")[0] ?? "",
      lastName: user.name?.split(" ").slice(1).join(" ") ?? "",
      description: user.description ?? "",
      city: user.city ?? "",
      school: user.school ?? "",
      work: user.work ?? "",
      website: user.website ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    const { success, message } = await updateProfile(data);

    if (success) {
      toast.success(message);
      setOpen(false);
    } else {
      toast.error(message);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="text-xs text-blue-500 font-medium select-none cursor-pointer">
            Update
          </span>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription className="text-xs">
              Use <b>navbar profile icon</b> to change the avatar and names.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="relative max-w-16 h-12 mx-auto mt-1">
                <Image
                  src={user.cover ?? ""}
                  alt=""
                  fill 
                  className="object-cover rounded-xl"
                />
                <span className="absolute bg-white rounded-full left-0 right-0 mx-auto p-1 px-2 text-primary -bottom-2 select-none cursor-pointer text-xs">
                  Change
                </span>
              </div>

              <div className="grid grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex. Software Engineer" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is a brief description about yourself.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>School</FormLabel>
                      <FormControl>
                        <Input placeholder="School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="work"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Work</FormLabel>
                      <FormControl>
                        <Input placeholder="Apple Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? <LoadingIcon /> : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
