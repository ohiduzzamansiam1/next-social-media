import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../../../../prisma/db";

export default async function UserMediaCard({ user }: { user: User }) {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      image: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center text-xs justify-between">
        <span className="text-gray-500">User Media</span>
        <Link href="" className="text-blue-500 font-medium">
          See all
        </Link>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-wrap justify-between gap-4">
        {postsWithMedia.length ? (
          postsWithMedia.map((post, i) => (
            <div
              key={i}
              className="relative w-1/5 h-20 2xl:h-24 cursor-pointer select-none"
            >
              <Image
                src={post?.image ?? ""}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xs">No media found!</p>
        )}
      </div>
    </div>
  );
}
