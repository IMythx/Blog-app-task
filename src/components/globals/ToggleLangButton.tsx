"use client";
import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";

const ToggleLangButton = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const params = useParams()

  const locale = useLocale();

  const pathname = usePathname();

  const headerT = useTranslations("LAYOUT.HEADER");

  const nextLocale = locale === "en" ? "ar" : "en";

  const toggleLang = () =>
    startTransition(() => {
      router.replace(pathname + params, { locale: nextLocale });
    });

  return (
    <Button disabled={isPending} onClick={toggleLang} variant={"outline"}>
      {headerT("LANG")}
    </Button>
  );
};

export default ToggleLangButton;
