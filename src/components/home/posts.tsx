"use client";
import Pagination from "rc-pagination/lib/Pagination";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";

const Posts = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page"));

  const pathName = usePathname();

  const router = useRouter();

  const t = useTranslations("LAYOUT.PAGINATION");

  return (
    <div className="grid gap-8">
      {children}
      <Pagination
        showLessItems={false}
        className="!mx-auto w-fit"
        showTitle={false}
        total={25}
        itemRender={(current, type, element) => {
          if (!isMobile) {
            return element;
          }
          if (type !== "page") return element;
          if (current - page < 3 && current - page >= 0) return element;
        }}
        onChange={(page) => {
          // setPage(page);
          const params = new URLSearchParams(searchParams.toString());

          page !== 1 ? params.set("page", String(page)) : params.delete("page");

          router.push(pathName + "?" + params.toString());
        }}
        style={{ margin: 0 }}
        current={page}
        pageSize={10}
        nextIcon={
          <Button
            variant={"outline"}
            className={cn(
              "max-h-[36px] gap-1 sm:w-auto w-fit sm:px-4 px-2 sm:min-w-[120px] min-w-fit",
            )}
          >
            {t("NEXT_BUTTON")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              className="rtl:rotate-180"
            >
              <path
                d="M3.83398 7.99967H13.1673M13.1673 7.99967L8.50065 3.33301M13.1673 7.99967L8.50065 12.6663"
                stroke="#1E1E1E"
                stroke-width="1.336"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        }
        prevIcon={
          <Button
            variant={"outline"}
            className={cn(
              "max-h-[36px] gap-1 sm:w-auto w-fit sm:px-4 px-2 sm:min-w-[120px] min-w-fit",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              className="ltr:rotate-180"
            >
              <path
                d="M3.83398 7.99967H13.1673M13.1673 7.99967L8.50065 3.33301M13.1673 7.99967L8.50065 12.6663"
                stroke="#1E1E1E"
                stroke-width="1.336"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            {t("PREVIOUS_BUTTON")}
          </Button>
        }
      />
    </div>
  );
};

export default Posts;
