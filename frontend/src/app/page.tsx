import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Page() {
  const socialLoginForKakaoUrl = `http://localhost:8080/oauth2/authorization/kakao`;
  const redirectUrlAfterSocialLogin = "http://localhost:3000";

  return (
    <div className="felx-1 flex justify-center items-center">
      <Button variant="outline" asChild>
        <a
          href={`${socialLoginForKakaoUrl}?redirectUrl=${redirectUrlAfterSocialLogin}`}
        >
          <MessageCircle />
          <span className="font-bold">카카오 로그인</span>
        </a>
      </Button>
    </div>
  );
}
