"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/db";
import { updateProfileSchema } from "./validator/updateProfileSchema.";

export async function switchFollow(userId: string) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) return;

  try {
    const existFollow = await prisma.follower.findFirst({
      where: {
        followerId: clerkUserId,
        followingId: userId,
      },
    });

    if (existFollow) {
      await prisma.follower.delete({
        where: {
          id: existFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: clerkUserId,
          receiverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: clerkUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log("🚀 ~ switchFollow ~ error:", error)
    throw new Error("Something went wrong");
  }
}

export async function switchBlock(userId: string) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) return;

  try {
    const existBlock = await prisma.block.findFirst({
      where: {
        blockerId: clerkUserId,
        blockedId: userId,
      },
    });

    if (existBlock) {
      await prisma.block.delete({
        where: {
          id: existBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: clerkUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log("🚀 ~ switchBlock ~ error:", error)
    throw new Error("Something went wrong");
  }
}

export async function acceptFollowRequest(userId: string) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) return;

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: clerkUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: clerkUserId,
        },
      });
    }

    revalidatePath("/", "layout");
  } catch (error) {
    console.log("🚀 ~ acceptFollowRequest ~ error:", error)
    throw new Error("Something went wrong");
  }
}

export async function rejectFollowRequest(userId: string) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) return;

  try {
    await prisma.followRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: userId,
          receiverId: clerkUserId,
        },
      },
    });
    revalidatePath("/", "layout");
  } catch (error) {
    console.log("🚀 ~ rejectFollowRequest ~ error:", error)
    throw new Error("Something went wrong");
  }
}

export async function updateProfile(data: any) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId)
    return { success: false, message: "User not authenticated" };

  // Validate incoming data
  const parsedData = updateProfileSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  const { description, city, school, work, website } = parsedData.data;

  try {
    await prisma.user.update({
      where: { id: clerkUserId },
      data: {
        description,
        city,
        school,
        work,
        website,
      },
    });

    revalidatePath("/", "layout");

    return { success: true, message: "Profile Updated" };
  } catch (error) {
    console.log("🚀 ~ updateProfile ~ error:", error)
    return { success: false, message: "Something went wrong" };
  }
}
