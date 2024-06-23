import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./common/UserAvatar";

export default function FriendRequests() {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 select-none cursor-pointer">
            <UserAvatar
              avatarUrl="https://images.pexels.com/photos/13211899/pexels-photo-13211899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              name="O"
              className="object-cover size-8"
            />

            <span className="block text-xs font-medium">Mabel Stanley</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/accept.png"
              alt=""
              width={16}
              height={16}
              className="size-4 cursor-pointer select-none"
              draggable={false}
            />
            <Image
              src="/reject.png"
              alt=""
              width={16}
              height={16}
              className="size-4 cursor-pointer select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
