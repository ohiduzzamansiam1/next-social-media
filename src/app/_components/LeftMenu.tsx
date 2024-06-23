import Image from "next/image";
import Link from "next/link";
import ProfileCard from "../(routes)/profile/_components/ProfileCard";
import Ad from "./Ad";

const leftMenuItems = [
  {
    id: 1,
    name: "My Posts",
    image: "/posts.png",
    href: "/",
  },
  {
    id: 2,
    name: "Activity",
    image: "/activity.png",
    href: "/",
  },
  {
    id: 3,
    name: "Marketplace",
    image: "/market.png",
    href: "/",
  },
  {
    id: 4,
    name: "Events",
    image: "/events.png",
    href: "/",
  },
  {
    id: 5,
    name: "Albums",
    image: "/albums.png",
    href: "/",
  },
  {
    id: 6,
    name: "Videos",
    image: "/Videos.png",
    href: "/",
  },
  {
    id: 7,
    name: "News",
    image: "/news.png",
    href: "/",
  },
  {
    id: 8,
    name: "Courses",
    image: "/courses.png",
    href: "/",
  },
  {
    id: 9,
    name: "Lists",
    image: "/lists.png",
    href: "/",
  },
  {
    id: 10,
    name: "Settings",
    image: "/settings.png",
    href: "/",
  },
];

export default function LeftMenu({ type }: { type: "profile" | "home" }) {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}

      <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col text-sm gap-2 text-gray-500">
        {leftMenuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-4 p-2 py-3 rounded-lg hover:bg-slate-200 transition"
          >
            <Image src={item.image} alt="" width={20} height={20} />
            {item.name}
          </Link>
        ))}
      </div>

      <Ad size="sm" />
    </div>
  );
}
