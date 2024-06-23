"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../../prisma/db";

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
    console.log(error);
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
    console.log(error);
    throw new Error("Something went wrong");
  }
}
