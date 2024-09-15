import Image from "next/image";

import HeaderImage from "@/pages/assets/header.svg";

export function Header() {
  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-r from-gradient from-100% via-white via-90%  to-gradient to-100%">
      <Image src={HeaderImage} alt="" />
    </div>
  );
}
