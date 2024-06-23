"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import UserAvatar from "./common/UserAvatar";

export default function Comments({
  comment_input_uniqueID,
}: {
  comment_input_uniqueID: string;
}) {
  const { user } = useUser();

  return (
    <div className="">
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <UserAvatar
          avatarUrl={user?.imageUrl ?? ""}
          name={user?.fullName ?? ""}
          className="size-6"
        />

        <div className="relative w-full">
          <Image
            src="/emoji.png"
            width={20}
            height={20}
            className="absolute right-0.5 top-0 m-[.62rem] cursor-pointer"
            alt=""
            quality={100}
          />
          <Input
            className="pl-4 pr-9 rounded-full bg-slate-100"
            placeholder="Write a comment..."
            id={`comment_input_${comment_input_uniqueID}`}
          />
        </div>
      </div>

      {/* COMMENTS */}
      <div className="mt-5">
        {/* COMMENT */}
        <div className="flex gap-4 justify-between mt-6">
          {/* AVATAR */}
          <UserAvatar
            avatarUrl={
              "https://images.pexels.com/photos/19915666/pexels-photo-19915666/free-photo-of-back-view-of-man-walking-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            name={user?.fullName ?? ""}
          />

          {/* CONTENT */}
          <div>
            <span className="font-medium text-sm">Juan Lawrence</span>
            <p className="text-sm">
              Shaking mice anywhere willing being hard remarkable load low shake
              save slight apartment.
            </p>

            <div className="flex items-center gap-8 text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer select-none size-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">54 Likes</span>
              </div>

              <div className="">
                <span>Reply</span>
              </div>
            </div>
          </div>

          {/* ICON */}
          <div className="">
            <EllipsisVertical className="text-slate-600 size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
