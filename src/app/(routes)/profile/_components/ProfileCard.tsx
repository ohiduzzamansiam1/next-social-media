import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../../../../prisma/db";

export default async function ProfileCard() {
  const clerkUser = await currentUser();

  if (!clerkUser?.id) return;

  const user = await prisma.user.findFirst({
    where: {
      username: clerkUser.username ?? "",
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return;

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col text-sm gap-6">
      <div className="h-20 relative">
        <Image
          src={user.cover ?? ""}
          alt=""
          fill
          className="rounded-xl object-cover"
          priority
        />
        <div className="absolute left-0 right-0 top-0 rounded-b-xl bottom-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
        <Image
          src={user?.avatar ?? ""}
          alt=""
          width={1000}
          height={1000}
          className="rounded-full size-14 m-auto absolute left-0 right-0 -bottom-6 ring-1 ring-white"
          priority
        />
      </div>

      <div className="h-22 flex flex-col gap-2 items-center mt-1">
        <span className="font-semibold">
          {user.name ?? user.username}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <Image
              src={clerkUser?.imageUrl ?? ""}
              alt=""
              width={12}
              height={12}
              className="rounded-full size-3"
            />
            <Image
              src={clerkUser?.imageUrl ?? ""}
              alt=""
              width={12}
              height={12}
              className="rounded-full size-3"
            />
            <Image
              src={clerkUser?.imageUrl ?? ""}
              alt=""
              width={12}
              height={12}
              className="rounded-full size-3"
            />
          </div>
          <span className="text-gray-600">
            {user?._count.followers} Followers
          </span>
        </div>

        <Link href={"/profile/" + user?.username} className="w-full">
          <Button size="sm" className="text-xs w-full rounded-xl">
            My Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
