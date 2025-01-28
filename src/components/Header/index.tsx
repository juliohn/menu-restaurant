"use client";
// React and Next.js imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// External library imports
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Internal imports
import { useAppSelector, useAppDispatch } from "@hooks";
import { setWhiteLabelConfig } from "@/store/whitelabel";
import { store } from "@/store";

export function Header() {
  const dispatch = useAppDispatch();
  const { bannerImage } = useAppSelector((state) => state.whitelabel);

  const locale = useAppSelector((state) => state.whitelabel.locale);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("menu");
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt-BR" ? "en-US" : "pt-BR";

    dispatch(
      setWhiteLabelConfig({
        ...store.getState().whitelabel,
        locale: newLang,
      })
    );

    setIsMenuOpen(false);
  };

  const handleMenuClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <header>
      <nav className="bg-header text-white" aria-label="Main navigation">
        <div className="container mx-auto px-4 md:pt-4 p-1">
          <div className="flex flex-col">
            {/* Mobile header */}
            <div className="md:hidden flex items-center h-16 justify-between px-2">
              <div className="flex-1" /> {/* Left spacer */}
              <div className="flex-1 text-center">
                <span className="text-lg">{t("menu")}</span>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={toggleLanguage}
                  className="text-white p-2 mr-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {locale === "pt-BR" ? "EN" : "PT"}
                </button>
                <button
                  onClick={toggleMenu}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-56 text-center">
                <Link
                  href="/"
                  onClick={() => handleMenuClick("menu")}
                  className="text-lg pb-2.5 inline-block hover:text-gray-200 transition-colors"
                >
                  {t("menu").toUpperCase()}
                </Link>
                {activeItem === "menu" && (
                  <div className="absolute bottom-0 left-0 w-full h-[5px] bg-white"></div>
                )}
              </div>
              <div className="relative w-56 text-center">
                <Link
                  href="/login"
                  onClick={() => handleMenuClick("login")}
                  className="text-lg pb-2.5 inline-block hover:text-gray-200 transition-colors"
                >
                  {t("menu_login").toUpperCase()}
                </Link>
                {activeItem === "login" && (
                  <div className="absolute bottom-0 left-0 w-full h-[5px] bg-white"></div>
                )}
              </div>
              <div className="relative w-56 text-center">
                <Link
                  href="/contact"
                  onClick={() => handleMenuClick("contact")}
                  className="text-lg pb-2.5 inline-block hover:text-gray-200 transition-colors"
                >
                  {t("menu_contact").toUpperCase()}
                </Link>
                {activeItem === "contact" && (
                  <div className="absolute bottom-0 left-0 w-full h-[5px] bg-white"></div>
                )}
              </div>
              <div className="w-56 text-center">
                <button
                  onClick={toggleLanguage}
                  className="text-lg hover:text-gray-200 transition-colors"
                >
                  {locale === "pt-BR" ? "EN" : "PT"}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div
                className="md:hidden flex flex-col space-y-4 pt-4 pb-4"
                role="menu"
                aria-orientation="vertical"
              >
                <Link
                  href="/"
                  className="text-lg hover:bg-white/10 p-2 rounded transition-colors"
                >
                  {t("menu")}
                </Link>
                <Link
                  href="/login"
                  className="text-lg hover:bg-white/10 p-2 rounded transition-colors"
                >
                  {t("menu_login")}
                </Link>
                <Link
                  href="/contact"
                  className="text-lg hover:bg-white/10 p-2 rounded transition-colors"
                >
                  {t("menu_contact")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Banner */}
      <section className="w-full -mt-1">
        <div className="relative h-[150px] w-full bg-gradient-to-b from-[#36231C] via-[#36231C] to-[#36231C]">
          <Image
            src={bannerImage}
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
