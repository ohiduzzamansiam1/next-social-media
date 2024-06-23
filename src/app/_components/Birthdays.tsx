import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserAvatar from "./common/UserAvatar";

export default function Birthdays() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col gap-4">
      {/* TOP */}

      <span className="text-gray-500 text-xs">Birthdays</span>

      {/* BIRTHDAYS */}
      <div className="flex flex-col gap-4">
        {/* USER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 justify-between">
            <div className="flex items-center gap-2 select-none cursor-pointer">
              <UserAvatar
                avatarUrl="https://images.pexels.com/photos/3175971/pexels-photo-3175971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                name="O"
                className="object-cover size-8"
              />

              <span className="block text-xs font-medium">Manuel Ortiz</span>
            </div>

            <Button variant={"link"} className="text-blue-500 text-xs">
              Celebrate
            </Button>
          </div>
        </div>

        {/* USER BIRTHDAY NOTICE */}
        <div className="flex rounded-lg bg-slate-100 items-center gap-4 p-4">
            <div>
                <Image src="/gift.png" alt="" width={24} height={24} />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 font-semibold block text-sm">Upcoming Birthday</span>
                <span className="text-xs text-gray-500">See other 13 have upcoming birthdays</span>
            </div>
        </div>
      </div>
    </div>
  );
}
