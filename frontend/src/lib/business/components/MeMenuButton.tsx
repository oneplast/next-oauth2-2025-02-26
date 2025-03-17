"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import client from "@/lib/backend/client";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import { LogOut, MonitorCog, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function MeMenuButton() {
  const router = useRouter();

  const { isAdmin, loginMember, removeLoginMember } = use(LoginMemberContext);

  const logout = () => {
    client.DELETE("/api/v1/members/logout").then((res) => {
      removeLoginMember();
      router.replace("/");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Image
            className="rounded-full"
            src={loginMember.profileImgUrl}
            alt={loginMember.nickname}
            width={32}
            height={32}
            quality={100}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button variant="link" className="w-full justify-start" asChild>
            <Link href="/member/me">
              <User />
              {loginMember.nickname}
            </Link>
          </Button>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem>
            <Button variant="link" className="w-full justify-start" asChild>
              <Link href="/adm">
                <MonitorCog />
                관리자 홈
              </Link>
            </Button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Button variant="link" onClick={logout}>
            <LogOut />
            로그아웃
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
