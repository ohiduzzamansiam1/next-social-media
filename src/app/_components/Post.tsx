"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Comments from "./Comments";
import UserAvatar from "./common/UserAvatar";

export default function Post() {
  const { user } = useUser();
  const comment_input_uniqueID = new Date().getTime().toString();

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <UserAvatar
            avatarUrl={user?.imageUrl ?? ""}
            name={user?.fullName ?? ""}
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm text-neutral-800 max-w-[200px] sm:max-w-fit line-clamp-1">
              {user?.fullName}
            </span>
            <span className="text-neutral-400 text-xs">Posted 2 days ago</span>
          </div>
        </div>

        <Ellipsis className="text-neutral-800" />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Dialog>
            <DialogTrigger>
              <Image
                src="https://images.pexels.com/photos/21937092/pexels-photo-21937092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="object-cover rounded-xl"
                quality={100}
                priority
                fill
              />
            </DialogTrigger>
            <DialogContent className="h-full rounded-3xl">
              <Image
                src="https://images.pexels.com/photos/21937092/pexels-photo-21937092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="object-cover rounded-xl"
                quality={100}
                priority
                fill
              />
            </DialogContent>
          </Dialog>
        </div>

        <span className="text-[0.9rem] leading-relaxed">
          Next.js 15 full stack app project. Complete social media application
          tutorial with the new React 19 features. useOptimistic,
          useActionState, and more.
        </span>
      </div>

      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm mb-5 mt-3">
        <div className="flex gap-8">
          {/* LIKES */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 px-4 rounded-full cursor-pointer select-none">
            <Image
              src="/like.png"
              alt=""
              width={1000}
              height={1000}
              className="size-4"
            />
            <span className="text-neutral-300">|</span>
            <span className="font-medium text-xs text-neutral-500">
              24 <span className="hidden md:inline">Likes</span>
            </span>
          </div>

          {/* COMMENTS TEXT */}
          <div
            className="flex items-center gap-4 bg-slate-100 p-2 px-4 rounded-full cursor-pointer select-none"
            onClick={() => {
              document
                .getElementById(`comment_input_${comment_input_uniqueID}`)
                ?.focus();
            }}
          >
            <Image
              src="/comment.png"
              alt=""
              width={1000}
              height={1000}
              className="size-4"
            />
            <span className="text-neutral-300">|</span>
            <span className="font-medium text-xs text-neutral-500">
              3 <span className="hidden md:inline">Comments</span>
            </span>
          </div>
        </div>

        {/* SHARES */}
        <div className="flex items-center gap-4 bg-slate-100 p-2 px-4 rounded-full">
          <Image
            src="/share.png"
            alt=""
            width={1000}
            height={1000}
            className="size-4"
          />
          <span className="text-neutral-300">|</span>
          <span className="font-medium text-xs text-neutral-500">
            12 <span className="hidden md:inline">Shares</span>
          </span>
        </div>

        {/* COMMENTS */}
      </div>
      <Comments comment_input_uniqueID={comment_input_uniqueID} />
    </div>
  );
}
