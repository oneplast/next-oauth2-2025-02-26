"use client";

import Image from "next/image";

import { useGlobalLoginMember } from "@/stores/auth/loginMember";

export default function ClientPage() {
  const { loginMember } = useGlobalLoginMember();

  return (
    <div className="flex-1 flex justify-center items-center">
      <div>
        <div>별명 : {loginMember.nickname}</div>
        <div className="mt-2 flex justify-center">
          <Image
            className="rounded-full"
            src={loginMember.profileImgUrl}
            alt={loginMember.nickname}
            width={80}
            height={80}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
