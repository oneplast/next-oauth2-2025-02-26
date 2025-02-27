"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginMemberContext, useLoginMember } from "@/stores/auth/loginMember";
import { Home, LogIn, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ModelToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ClientLayout({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const router = useRouter();

  const {
    setLoginMember,
    isLogin,
    loginMember,
    removeLoginMember,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  } = useLoginMember();

  const loginMemberContextValue = {
    loginMember,
    setLoginMember,
    removeLoginMember,
    isLogin,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoginMember({
        id: 2,
        createDate: "",
        modifyDate: "",
        nickname: "admin",
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoginMemberPending) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground">
        인증 정보 로딩중...
      </div>
    );
  }

  const logout = () => {
    removeLoginMember();
    router.replace("/");
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LoginMemberContext value={loginMemberContextValue}>
        <header className="flex p-2">
          <Button variant="link" asChild>
            <Link href="/">
              <Home />홈
            </Link>
          </Button>

          {isAdmin && (
            <Button variant="link" asChild>
              <Link href="/adm">
                <Settings />
                관리자
              </Link>
            </Button>
          )}

          {isLogin && (
            <Button variant="link" asChild>
              <Link href="/member/me">
                <User /> 내 정보
              </Link>
            </Button>
          )}

          {isLogin && (
            <Button variant="link" onClick={logout}>
              <LogOut />
              로그아웃
            </Button>
          )}

          {!isLogin && (
            <Button variant="link" asChild>
              <Link href="/adm/member/login">
                <LogIn /> 관리자 로그인
              </Link>
            </Button>
          )}
          <div className="flex-grow"></div>
          <ModelToggle />
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="p-2 flex justify-center">
          <Button variant="link" asChild>
            <Link href="/adm">
              <Settings />
              관리자
            </Link>
          </Button>

          <Button variant="link" asChild>
            <Link href="/adm/member/login">
              <LogIn /> 관리자 로그인
            </Link>
          </Button>

          <Button variant="link" asChild>
            <Link href="/member/me">
              <User />내 정보
            </Link>
          </Button>
        </footer>
      </LoginMemberContext>
    </NextThemesProvider>
  );
}
