"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import { AlignRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LoadingIcon from "./common/LoadingIcon";

const mobileMenus = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Friends",
    href: "/friends",
  },
  {
    id: 3,
    name: "Groups",
    href: "/groups",
  },
  {
    id: 4,
    name: "Stories",
    href: "/stories",
  },
  {
    id: 5,
    name: "login",
    href: "/sign-in",
  },
];

function Navbar() {
  const [showSheet, setShowSheet] = useState(false);
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <div
      className={"flex items-center justify-between px-3 h-16 md:h-20 lg:px-0"}
    >
      {/* LEFT */}
      <div>
        {/* <Link href={"/"} className={"text-xl font-bold text-neutral-900"}>
          SIAMSOCIAL
        </Link> */}
        <Link href="/">
          <Image src={"/vercel.svg"} width={90} height={90} alt="Logo" />
        </Link>
      </div>

      {/* CENTER */}
      <div className={"hidden lg:flex gap-5 items-center"}>
        <ClerkLoading>
          <LoadingIcon />
        </ClerkLoading>
        {mobileMenus.map((menu) => (
          <React.Fragment key={menu.id}>
            {menu.id !== 5 && user?.id && (
              <Link
                href={menu.href}
                className={`text-sm ${
                  pathname === menu.href
                    ? "font-bold text-primary"
                    : "text-neutral-500 hover:text-black transition"
                }`}
                key={menu.id}
              >
                {menu.name}
              </Link>
            )}
          </React.Fragment>
        ))}

        <ClerkLoaded>
          <SignedIn>
            <div className="relative w-full">
              <Search className="absolute left-0 top-0 m-[.8rem] h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search" />
            </div>
          </SignedIn>
        </ClerkLoaded>
      </div>

      {/* RIGHT FOR DESKTOP */}
      <div className="hidden lg:flex">
        <ClerkLoading>
          <LoadingIcon />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-1.5">
              <SignInButton>
                <Button variant={"secondary"}>Login</Button>
              </SignInButton>

              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>

      {/* RIGHT FOR MOBILE */}
      <div className={"flex items-center gap-3 lg:hidden"}>
        <ClerkLoading>
          <LoadingIcon />
        </ClerkLoading>
        <UserButton />
        <Sheet open={showSheet} onOpenChange={setShowSheet}>
          <SheetTrigger>
            <AlignRight className={"text-neutral-900 cursor-pointer size-7"} />
          </SheetTrigger>
          <SheetContent>
            <div
              className={
                "flex flex-col gap-5 w-full items-center justify-center h-full"
              }
            >
              {mobileMenus.map((menu) => (
                <React.Fragment key={menu.id}>
                  {menu.id !== 5 && user?.id && (
                    <Link
                      href={menu.href}
                      className={`text-lg font-semibold ${
                        pathname !== menu.href
                          ? "text-neutral-300 dark:text-white/50"
                          : "text-primary font-bold"
                      }`}
                      onClick={() => setShowSheet(false)}
                      key={menu.id}
                    >
                      {menu.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
