import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import prisma from "../../../prisma/db";
import UserAvatar from "./common/UserAvatar";

export default async function AddPost() {
  const user = await currentUser();

  const addPostAction = async (formData: FormData) => {
    "use server";

    if (!user?.id) return;

    const desc = formData.get("desc") as string;

    try {
      await prisma.post.create({
        data: {
          desc,
          userId: user.id,
        },
      });

      revalidatePath("/", "layout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl flex gap-4 justify-between text-sm shadow-sm">
      {/* AVATAR */}
      <UserAvatar
        avatarUrl={user?.imageUrl ?? ""}
        name={user?.fullName ?? ""}
        className="hidden md:block"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action={addPostAction} className="flex gap-4">
          <Textarea
            placeholder="Whats on your mind?"
            className="bg-slate-100"
            name="desc"
          />
          {/* <Image
            src="/emoji.png"
            quality={100}
            alt="Emoji"
            width={1000}
            height={1000}
            className="size-8 self-end cursor-pointer select-none"
          /> */}
          <Button type="submit" className="self-end">
            Send
          </Button>
        </form>

        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-500 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addimage.png"
              width={20}
              height={20}
              className="size-4 md:size-5"
              alt=""
            />
            Photo
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              width={20}
              height={20}
              className="size-4 md:size-5"
              alt=""
            />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              width={20}
              height={20}
              className="size-4 md:size-5"
              alt=""
            />
            Event
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              width={20}
              height={20}
              className="size-4 md:size-5"
              alt=""
            />
            Poll
          </div>
        </div>
      </div>
    </div>
  );
}
