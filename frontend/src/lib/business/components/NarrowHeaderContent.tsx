"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import client from "@/lib/backend/client";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import {
  LogOut,
  Menu,
  MonitorCog,
  Pencil,
  TableOfContents,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import Logo from "./Logo";
import MeMenuButton from "./MeMenuButton";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";

export default function NarrowHeaderContent({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { isLogin, isAdmin, loginMember, removeLoginMember } =
    use(LoginMemberContext);

  const logout = () => {
    client.DELETE("/api/v1/members/logout").then((res) => {
      removeLoginMember();
      router.replace("/");
    });
  };

  return (
    <div className={`${className} py-1`}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>전체 메뉴</DrawerTitle>
          </DrawerHeader>
          <div className="max-h-[calc(100dvh-150px)] px-2 pb-2 overflow-y-auto">
            <ul>
              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/post/list">
                    <TableOfContents />글
                  </Link>
                </Button>
              </li>

              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/post/list">
                    <Pencil />
                    작성
                  </Link>
                </Button>
              </li>

              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Logo text />
                </Button>
              </li>

              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/member/me">
                    <User />
                    {loginMember.nickname}
                  </Link>
                </Button>
              </li>

              {isAdmin && (
                <li>
                  <Button
                    variant="link"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/adm">
                      <MonitorCog />
                      관리자 홈
                    </Link>
                  </Button>
                </li>
              )}

              {isLogin && (
                <li>
                  <Button variant="link" onClick={logout}>
                    <LogOut />
                    로그아웃
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
      <Button variant="link" asChild>
        <Logo />
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  );
}
