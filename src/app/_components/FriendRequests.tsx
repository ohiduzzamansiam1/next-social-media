import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendRequestList from "../(routes)/profile/_components/FriendRequestList";
import prisma from "../../../prisma/db";

export default async function FriendRequests() {
  const { userId } = auth();

  const followRequests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId ?? "",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      sender: true,
    },
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center text-xs justify-between">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="" className="text-blue-500 font-medium">
          See all
        </Link>
      </div>

      {/* USER */}
      <div className="flex flex-col gap-4">
        <FriendRequestList requests={followRequests} />
      </div>
    </div>
  );
}
