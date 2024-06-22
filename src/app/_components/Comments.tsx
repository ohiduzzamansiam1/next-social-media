"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import UserAvatar from "./common/UserAvatar";

export default function Comments({comment_input_uniqueID}: { comment_input_uniqueID: string}) {
  const { user } = useUser();

  return (
    <div className="">
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <UserAvatar
          avatarUrl={user?.imageUrl ?? ""}
          name={user?.fullName ?? ""}
        />

        <div className="relative w-full">
          <Image
            src="/emoji.png"
            width={20}
            height={20}
            className="absolute right-0.5 top-0 m-[.62rem] cursor-pointer"
            alt=""
          />
          <Input
            className="pl-4 pr-9 rounded-full bg-slate-100"
            placeholder="Write a comment..."
            id={`comment_input_${comment_input_uniqueID}`}
          />
        </div>
      </div>

      {/* COMMENTS */}
      <div className=""></div>
    </div>
  );
}
