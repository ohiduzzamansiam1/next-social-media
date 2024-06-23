import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import { Suspense } from "react";
import UserInfoCard from "../(routes)/profile/_components/UserInfoCard";
import UserMediaCard from "../(routes)/profile/_components/UserMediaCard";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

export default function RightMenu({ user }: { user?: User }) {
  return (
    <div className="flex flex-col gap-6">
      {!user ? (
        <>
          <FriendRequests />
          <Birthdays />
          <Ad size="lg" />
        </>
      ) : (
        <>
          <Suspense
            fallback={<Skeleton className="h-32 w-full rounedd-xl bg-white" />}
          >
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="h-32 w-full rounedd-xl bg-white" />}
          >
            <UserMediaCard user={user} />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="h-32 w-full rounedd-xl bg-white" />}
          >
            <FriendRequests />
          </Suspense>
        </>
      )}
    </div>
  );
}
