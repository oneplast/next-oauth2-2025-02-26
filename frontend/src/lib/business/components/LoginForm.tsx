import { Button } from "@/components/ui/button";
import client from "@/lib/backend/client";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const { setLoginMember } = use(LoginMemberContext);
  const router = useRouter();

  const handleSumbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (form.username.value.length === 0) {
      toast.error("아이디를 입력해주세요.");
      form.username.focus();
      return;
    }

    if (form.password.value.length === 0) {
      toast.error("비밀번호를 입력해주세요.");
      form.password.focus();
      return;
    }

    const response = await client.POST("/api/v1/members/login", {
      body: {
        username: form.username.value,
        password: form.password.value,
      },
    });

    if (response.error) {
      toast.error(response.error.msg);
      return;
    }

    toast(response.data.msg);

    setLoginMember(response.data.data.item);

    router.replace("/");
  };

  return (
    <form
      onSubmit={handleSumbmit}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium">아이디</label>
        <input
          type="text"
          name="username"
          className="p-2 border rounded-md bg-inherit"
          placeholder="아이디를 입력해주세요."
          autoComplete="off"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">비밀번호</label>
        <input
          type="password"
          name="password"
          className="p-2 border rounded-md bg-inherit"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <Button type="submit" className="mt-2">
        로그인
      </Button>
    </form>
  );
}
