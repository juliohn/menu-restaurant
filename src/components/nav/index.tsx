import Link from "next/link";

import { Menu } from "lucide-react";

export function Nav() {
  return (
    <div
      className={
        " w-full mx-auto flex items-center  py-2 h-16 bg-primary fixed top-0"
      }
    >
      <div className="grow">
        <div className="hidden md:flex items-center justify-center gap-2 md:gap-8 text-white text-2xl text-center">
          <Link href="#">MENU</Link>
          <Link href="#">ENTRAR</Link>
          <Link href="#">CONTATO</Link>
        </div>

        <div className="flex md:hidden  cursor-pointer justify-between items-center px-4">
          <div className=""></div>
          <div className="text-white  text-center font-medium text-lg">
            Menu
          </div>
          <div>
            <Menu color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
