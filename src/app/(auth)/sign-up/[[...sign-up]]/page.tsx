import LoadingIcon from "@/app/_components/common/LoadingIcon";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <ClerkLoading>
        <LoadingIcon />
      </ClerkLoading>

      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </div>
  );
}
