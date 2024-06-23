"use client";

import { Button } from "@/components/ui/button";
import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

interface iProps {
  userId: string;
  clerkUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingRequestSent: boolean;
}

export default function UserInfoInteraction({
  userId,
  clerkUserId,
  isUserBlocked,
  isFollowing,
  isFollowingRequestSent,
}: iProps) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    followingRequestSent: isFollowingRequestSent,
    blocked: isUserBlocked,
  });

  const blockAction = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: prev.blocked ? false : true,
      }));
    } catch (error) {}
  };

  const followAction = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") => {
      switch (value) {
        case "follow":
          return {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          };
        case "block":
          return {
            ...state,
            blocked: state.blocked ? false : true,
          };
      }
    }
  );

  return (
    <>
      <form action={followAction}>
        <Button
          className="w-full rounded-xl"
          variant={
            optimisticState.following || optimisticState.followingRequestSent
              ? "secondary"
              : "default"
          }
          type="submit"
        >
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Requested"
            : "Follow"}
        </Button>
      </form>
      <form action={blockAction} className="justify-end flex">
        <Button
          className={`flex -my-3 text-xs w-fit ${
            !optimisticState.blocked ? "text-red-500" : "text-green-500"
          }`}
          variant={"link"}
          type="submit"
        >
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </Button>
      </form>
    </>
  );
}
