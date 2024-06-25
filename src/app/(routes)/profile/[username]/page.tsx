import Feed from "@/app/_components/Feed";
import LeftMenu from "@/app/_components/LeftMenu";
import RightMenu from "@/app/_components/RightMenu";
import { kFormatter } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import prisma from "../../../../../prisma/db";

async function ProfileRoute({ params }: { params: { username: string } }) {
  const clerkUser = await currentUser();

  if (!clerkUser?.id) return;

  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          post: true,
        },
      },
    },
  });

  if (!user) redirect("/");

  return (
    <div className="h-full flex gap-6 py-3 px-3 lg:px-0">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-3">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-64 relative">
            <Image
              src={user?.cover ?? ""}
              fill
              alt=""
              className="object-cover rounded-xl"
            />
            <div className="absolute left-0 right-0 top-0 rounded-b-xl bottom-0 bg-gradient-to-t from-slate-100 to-transparent"></div>
            <Image
              src={user?.avatar ?? ""}
              alt=""
              width={1000}
              height={1000}
              className="rounded-full ring-4 ring-white absolute left-0 right-0 m-auto -bottom-16 size-32"
            />
          </div>

          <h1 className="mt-20 mb-3 text-2xl font-bold text-neutral-800">
            {user?.name ?? user?.username}
          </h1>
          <div className="flex gap-10 mb-3">
            <div className="text-center text-xs font-semibold text-neutral-600">
              <p>{kFormatter(user?._count?.post)}</p>
              <p>Posts</p>
            </div>
            <div className="text-center text-xs font-semibold text-neutral-600">
              <p>{kFormatter(user?._count?.followers)}</p>
              <p>Followers</p>
            </div>
            <div className="text-center text-xs font-semibold text-neutral-600">
              <p>{kFormatter(user?._count?.following)}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        <Feed />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
}
export default ProfileRoute;
