import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  LinkIcon,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import prisma from "../../../../../prisma/db";
import UserInfoInteraction from "./UserInfoInteraction";

export default async function UserInfoCard({ user }: { user: User }) {
  const clerkUser = await currentUser();

  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingRequestSent = false;

  if (clerkUser) {
    const blockResponse = await prisma.block.findFirst({
      where: {
        blockerId: clerkUser.id,
        blockedId: user.id,
      },
    });
    blockResponse ? (isUserBlocked = true) : (isUserBlocked = false);

    const followingResponse = await prisma.follower.findFirst({
      where: {
        followerId: clerkUser.id,
        followingId: user.id,
      },
    });
    followingResponse ? (isFollowing = true) : (isFollowing = false);

    const followingRequestResponse = await prisma.followRequest.findFirst({
      where: {
        senderId: clerkUser.id,
        receiverId: user.id,
      },
    });
    followingRequestResponse
      ? (isFollowingRequestSent = true)
      : (isFollowingRequestSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center text-xs justify-between">
        <span className="text-gray-500">User Infromation</span>
        <Link href="" className="text-blue-500 font-medium">
          See all
        </Link>
      </div>

      {/* USER INFOs & ACTIONS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p className="text-xl text-neutral-800 font-semibold">
            Ohiduzzaman Siam
          </p>
          <span className="text-sm text-muted-foreground">@marguerite</span>
        </div>

        {/* SMALL DETAILS */}
        <div className="flex flex-col gap-2">
          {user.city && (
            <div className="flex items-center gap-2 text-[.8rem] text-gray-400">
              <MapPin className="size-3" />
              <p>
                Living in{" "}
                <strong className="text-neutral-600">{user.city}</strong>
              </p>
            </div>
          )}

          {user?.school && (
            <div className="flex items-center gap-2 text-[.8rem] text-gray-400">
              <GraduationCap className="size-3" />
              <p>
                Went to{" "}
                <strong className="text-neutral-600">{user?.school}</strong>
              </p>
            </div>
          )}

          {user?.work && (
            <div className="flex items-center gap-2 text-[.8rem] text-gray-400">
              <BriefcaseBusiness className="size-3" />
              <p>
                Works at{" "}
                <strong className="text-neutral-600">{user?.work}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between *:text-neutral-600 text-xs">
          {user?.website && (
            <p className="flex gap-2 items-center">
              <LinkIcon className="size-3" />
              <Link href={"/"} className="text-blue-500 font-semibold">
                siam.dev
              </Link>
            </p>
          )}

          <p className="flex gap-2 items-center">
            <CalendarDays className="size-3" />
            Joined on {formattedDate}
          </p>
        </div>

        {/* {user?.id !== clerkUser?.id && ( */}
          <UserInfoInteraction
            userId={user?.id}
            clerkUserId={clerkUser?.id ?? ""}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingRequestSent={isFollowingRequestSent}
          />
        {/* )} */}
      </div>
    </div>
  );
}
