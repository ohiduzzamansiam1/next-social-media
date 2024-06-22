import LoadingIcon from "@/app/_components/common/LoadingIcon";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <ClerkLoading>
       <LoadingIcon />
      </ClerkLoading>

      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </div>
  );
}
