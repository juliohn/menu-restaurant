"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="bg-[#3c2a21] text-white">
        <div className="container mx-auto px-4 md:pt-4 p-2">
          <div className="flex flex-col">
            {/* Mobile view */}
            <div className="md:hidden flex items-center justify-between px-2 py-3">
              <div className="flex-1"></div> {/* Espaçador esquerdo */}
              <div className="flex-1 text-center">
                <span className="text-[20px]">MENU</span>
              </div>
              <div className="flex-1 flex justify-end">
                <button onClick={toggleMenu} className="text-white">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-[232px] text-center">
                <a href="#" className="text-[20px] pb-[10px] inline-block">
                  MENU
                </a>
                <div className="absolute bottom-0 left-0 w-full h-[10px] bg-white"></div>
              </div>
              <div className="w-[232px] text-center">
                <a href="#" className="text-[20px]">
                  ENTRAR
                </a>
              </div>
              <div className="w-[232px] text-center">
                <a href="#" className="text-[20px]">
                  CONTATO
                </a>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden flex flex-col space-y-4 pt-4">
                <a href="#" className="text-[20px] font-roboto">
                  MENU
                </a>
                <a href="#" className="text-[20px] font-roboto">
                  ENTRAR
                </a>
                <a href="#" className="text-[20px] font-roboto">
                  CONTATO
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop banner */}
      <section className="w-full -mt-1">
        <div className="relative h-[200px] w-full bg-gradient-to-b from-[#36231C] via-[#36231C] to-[#36231C]">
          <Image
            src="https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png"
            alt="Burguers Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>
    </header>
  );
}
