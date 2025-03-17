"use client";

import { Button } from "@/components/ui/button";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import { use } from "react";
import Logo from "./Logo";
import MeMenuButton from "./MeMenuButton";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { Pencil, TableOfContents } from "lucide-react";

export default function WideHeaderContent({
  className,
}: {
  className?: string;
}) {
  const { isLogin } = use(LoginMemberContext);

  return (
    <div className={`${className} py-1`}>
      <Button variant="link" asChild>
        <Logo text />
      </Button>
      <Button variant="link" asChild>
        <Link href="/post/list">
          <TableOfContents />글
        </Link>
      </Button>
      {isLogin && (
        <Button variant="link" asChild>
          <Link href="/post/list">
            <Pencil />
            작성
          </Link>
        </Button>
      )}
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  );
}
