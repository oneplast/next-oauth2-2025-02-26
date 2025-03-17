"use client";

import { Button } from "@/components/ui/button";
import client from "@/lib/backend/client";
import MeMenuButton from "@/lib/business/components/MeMenuButton";
import ThemeToggleButton from "@/lib/business/components/ThemeToggleButton";
import { LoginMemberContext, useLoginMember } from "@/stores/auth/loginMember";
import { Home, LogIn, LogOut, Settings, User } from "lucide-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
    client.GET("/api/v1/members/me").then((res) => {
      if (res.error) {
        setNoLoginMember();
      } else {
        setLoginMember(res.data);
      }
    });
  }, []);

  if (isLoginMemberPending) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground">
        인증 정보 로딩중...
      </div>
    );
  }

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

          {!isLogin && (
            <Button variant="link" asChild>
              <Link href="/adm/member/login">
                <LogIn /> 관리자 로그인
              </Link>
            </Button>
          )}
          <div className="flex-grow"></div>
          {isLogin && <MeMenuButton />}
          <ThemeToggleButton />
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="p-2 flex justify-center">
          <span>© 2025 글로그</span>
        </footer>
      </LoginMemberContext>
    </NextThemesProvider>
  );
}
