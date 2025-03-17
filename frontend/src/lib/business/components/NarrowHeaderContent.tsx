"use client";

import { Button } from "@/components/ui/button";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import { Menu } from "lucide-react";
import { use } from "react";
import Logo from "./Logo";
import MeMenuButton from "./MeMenuButton";
import ThemeToggleButton from "./ThemeToggleButton";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function NarrowHeaderContent({
  className,
}: {
  className?: string;
}) {
  const { isLogin } = use(LoginMemberContext);

  return (
    <div className={`${className} py-1`}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>전체 메뉴</DrawerTitle>
          </DrawerHeader>
          <div className="max-h-[calc(100dvh-150px)] px-2 overflow-y-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam
            voluptates enim libero cumque eos, corporis ut quis unde, voluptas
            saepe reiciendis non illum sequi perspiciatis assumenda, fuga
            dolorum officia. Velit, voluptate? Eum laboriosam tempora delectus
            modi ab quis quo amet nemo nobis, excepturi, alias odio corporis
            nesciunt assumenda ipsa, nostrum corrupti doloribus reiciendis aut
            minus non autem ipsum voluptatum? Dicta voluptatem nobis modi
            nesciunt cumque explicabo autem est, totam iste suscipit mollitia?
            Assumenda fuga delectus in suscipit earum ullam unde ducimus eos,
            obcaecati esse ex accusantium voluptatibus nesciunt similique.
            Architecto recusandae, doloribus culpa dolorum provident ullam quos
            voluptatum blanditiis accusamus et tenetur, quaerat distinctio
            praesentium optio repellat sapiente voluptatibus nihil assumenda
            magnam adipisci quae! Provident accusantium minus commodi odit?
            Repellendus, fuga quibusdam, autem facilis inventore dolor eaque
            reiciendis, porro aliquam magni consectetur incidunt excepturi aut
            soluta odit praesentium ad quas animi necessitatibus! Recusandae
            maxime aut dolore praesentium repellendus! Autem! Libero, nobis
            possimus cumque amet vero unde, minima eos quas quisquam
            necessitatibus distinctio aliquid omnis velit, sequi similique?
            Magni amet eius veniam totam temporibus iusto in quibusdam, voluptas
            ipsa nesciunt? Molestiae optio perspiciatis dolorum rerum eaque,
            placeat odit? Delectus quis magni eius quas, architecto, neque
            beatae rem modi dignissimos distinctio nihil maiores eveniet
            voluptatum illo hic et esse nulla deleniti! Quia in nobis a
            temporibus voluptatem, culpa voluptatibus, sed assumenda maxime
            illum iusto quisquam tempora molestias quis cumque aliquid sunt
            quaerat eos. Cumque voluptatum nesciunt, accusamus exercitationem
            dolor provident voluptatibus! Fuga nam dolorum enim reiciendis sequi
            consequatur modi nisi. Qui, perspiciatis molestiae quidem nostrum
            expedita quos, aliquid quibusdam veritatis sequi explicabo modi
            consequatur dolore aspernatur eos recusandae pariatur amet
            dignissimos. Consequatur tempore magnam deserunt recusandae
            assumenda doloribus accusantium voluptate mollitia inventore ipsa
            placeat temporibus repudiandae sunt repellendus asperiores maiores
            tenetur, corporis quo? Velit, quo nemo? Nihil obcaecati repellat
            ullam voluptatem.
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
