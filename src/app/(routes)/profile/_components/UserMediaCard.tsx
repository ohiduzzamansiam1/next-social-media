import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function UserMediaCard({ user }: { user: User }) {
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
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="relative w-1/5 h-20 2xl:h-24 cursor-pointer select-none">
            <Image
              src="https://images.pexels.com/photos/25403118/pexels-photo-25403118/free-photo-of-a-blue-teacup-with-pink-roses-on-top.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
