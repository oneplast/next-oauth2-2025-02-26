"use client";

import { useGlobalLoginMember } from "@/stores/auth/loginMember";

import { Button } from "@/components/ui/button";

import { MessageCircle } from "lucide-react";

export default function ClientPage() {
  const { isLogin, loginMember } = useGlobalLoginMember();
  const socialLoginForKakaoUrl = `http://localhost:8080/oauth2/authorization/kakao`;
  const redirectUrlAfterSocialLogin = "http://localhost:3000";

  return (
    <div className="flex-1 flex justify-center items-center">
      {!isLogin && (
        <Button variant="outline" asChild>
          <a
            href={`${socialLoginForKakaoUrl}?redirectUrl=${redirectUrlAfterSocialLogin}`}
          >
            <MessageCircle />
            <span className="font-bold">카카오 로그인</span>
          </a>
        </Button>
      )}
      {isLogin && <div>{loginMember.nickname}님 환영합니다.</div>}
    </div>
  );
}
