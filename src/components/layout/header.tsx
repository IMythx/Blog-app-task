"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import ToggleLangButton from "../globals/ToggleLangButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SearchBar from "./searchBar";
import { Link } from "@/navigation";

const Header = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const t = useTranslations("LAYOUT.HEADER");
  return (
    <header className="px-4 sm:px-10 py-4 flex flex-col smflex-row gap-4">
      <div className="flex items-center gap-0 sm:gap-[20rem] justify-between sm:justify-normal">
        <div className="flex items-center gap-8 w-full">
          <Link
            href={"/"}
            className="font-bold text-lg sm:text-2xl whitespace-nowrap flex items-center gap-1"
          >
            <Image src={logo} width={30} height={30} alt="logo" />
            BLOG APP
          </Link>
          {!isMobile && <SearchBar />}
        </div>
        <div className="flex justify-end">
          <ToggleLangButton />
        </div>
      </div>
      {isMobile && <SearchBar />}
    </header>
  );
};

export default Header;
