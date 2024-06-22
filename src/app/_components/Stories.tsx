import Image from "next/image";

export default function Stories() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm overflow-x-scroll no-scrollbar text-sm">
      <div className="flex gap-8 min-w-max">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="flex flex-col gap-2 items-center cursor-pointer"
            key={i}
          >
            <Image
              src={
                "https://images.pexels.com/photos/19915666/pexels-photo-19915666/free-photo-of-back-view-of-man-walking-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="Image"
              width={80}
              height={80}
              className="size-16 md:size-20 rounded-full ring-2 "
            />
            <span className="font-medium"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
