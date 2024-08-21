"use client";
import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const ToggleLangButton = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const locale = useLocale();

  const pathname = usePathname();

  const headerT = useTranslations("LAYOUT.HEADER");

  const searchParams = useSearchParams();

  const nextLocale = locale === "en" ? "ar" : "en";

  const toggleLang = () =>
    startTransition(() => {
      router.replace(pathname + "?" + searchParams, { locale: nextLocale });
    });

  return (
    <Button disabled={isPending} onClick={toggleLang} variant={"outline"}>
      {headerT("LANG")}
    </Button>
  );
};

export default ToggleLangButton;
