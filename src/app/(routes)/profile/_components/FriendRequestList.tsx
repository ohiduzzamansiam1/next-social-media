"use client";

import UserAvatar from "@/app/_components/common/UserAvatar";
import { acceptFollowRequest, rejectFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useOptimistic } from "react";

type iProps = FollowRequest & {
  sender: User;
};

export default function FriendRequestList({
  requests,
}: {
  requests: iProps[];
}) {
  // State and function to keep track of optimistic requests.
  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requests,
    (state, value: string) => state.filter((request) => request.id !== value)
  );

  const acceptAction = async (requestId: string, userId: string) => {
    removeOptimisticRequests(requestId);
    try {
      await acceptFollowRequest(userId);
    } catch (error) {}
  };

  const rejectAction = async (requestId: string, userId: string) => {
    removeOptimisticRequests(requestId);
    try {
      await rejectFollowRequest(userId);
    } catch (error) {}
  };

  useEffect(() => {
    if (optimisticRequests.length) return;
  }, [optimisticRequests.length]);

  // Map over the requests array and render a component for each request.
  return optimisticRequests.length ? (
    optimisticRequests.map((request) => (
      <div className="flex items-center justify-between" key={request.id}>
        {/* Display the sender's avatar, name and username */}
        <Link
          href={`/profile/${request.sender.username}`}
          className="flex items-center gap-2 select-none cursor-pointer"
        >
          <UserAvatar
            avatarUrl={request.sender.avatar ?? ""}
            name="O"
            className="object-cover size-8"
          />

          <span className="block text-xs font-medium">
            {request.sender.name || request.sender.username}
          </span>
        </Link>
        {/* Display two buttons to accept or reject the request */}
        <div className="flex items-center gap-2 *:flex *:items-center *:justify-center">
          <form action={() => acceptAction(request.id, request.sender.id)}>
            <button type="submit">
              <Image
                src="/accept.png"
                alt=""
                width={16}
                height={16}
                className="size-4 cursor-pointer select-none"
                draggable={false}
              />
            </button>
          </form>
          <form action={() => rejectAction(request.id, request.sender.id)}>
            <button type="submit">
              <Image
                src="/reject.png"
                alt=""
                width={16}
                height={16}
                className="size-4 cursor-pointer select-none"
                draggable={false}
              />
            </button>
          </form>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-xs">No requests yet!</p>
  );
}
