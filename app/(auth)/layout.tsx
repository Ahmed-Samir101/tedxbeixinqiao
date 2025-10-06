"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignInPage = pathname.includes("sign-in");

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <Link href="/">
          <Button className="mb-2 font-bold text-lg" variant="ghost">
            TEDxBeixinqiao
          </Button>
        </Link>
        <p className="text-muted-foreground text-sm">
          Please sign in to continue to the platform
        </p>
      </div>
      {children}

      <div className="mt-6 text-center text-muted-foreground text-sm">
        <div className="flex justify-center gap-1">
          {isSignInPage ? (
            <>
              Don&apos;t have an account?{" "}
              <Link className="underline hover:text-primary" href="/sign-up">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link className="underline hover:text-primary" href="/sign-in">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
