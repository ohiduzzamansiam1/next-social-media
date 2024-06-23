import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import UserAvatar from "./common/UserAvatar";

export default function Ad({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <div className={`p-4 bg-white rounded-xl shadow-sm flex flex-col ${size === "sm" ? "gap-2" : "gap-4"}`}>
      {/* TOP */}
      <div className="flex items-center text-xs justify-between">
        <span className="text-gray-500">Ads</span>
        <EllipsisVertical className="size-4 text-nuteral-500 cursor-pointer" />
      </div>

      {/* ADS */}
      <div
        className={`flex flex-col ${size === "sm" ? "gap-2" : "gap-4"} mt-4`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/9934462/pexels-photo-9934462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex items-center gap-2">
          <UserAvatar
            avatarUrl="https://images.pexels.com/photos/14664613/pexels-photo-14664613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="O"
            className="size-8"
          />
          <span className="font-medium text-sm text-blue-500">
            Sylvia Ballard
          </span>
        </div>

        <p className="text-sm font-medium text-neutral-800">
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, magnam?"
            : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore
          ea consequuntur eligendi corrupti odio voluptate delectus, vel
          accusamus soluta.`}
        </p>

        <Button variant={"outline"} className="rounded-xl w-full mt-2">
          Learn More
        </Button>
      </div>
    </div>
  );
}
