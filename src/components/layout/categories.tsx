"use client";
import { Link } from "@/navigation";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const categories = [
  {
    name: "BUSINESS",
    path: "business",
  },
  {
    name: "ENTERTAINMENT",
    path: "entertainment",
  },
  {
    name: "HEALTH",
    path: "health",
  },
  {
    name: "SCIENCE",
    path: "science",
  },
  {
    name: "SPORTS",
    path: "sports",
  },
] as const;
const Categories = () => {
  const t = useTranslations("LAYOUT.CATEGORIES");

  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <div className="flex items-center">
      {!isMobile &&
        categories?.map((category, index) => (
          <Button variant={"link"} className="w-full" key={index}>
            <Link href={`/categories/${category.path}`}>
              {t(category.name)}
            </Link>
          </Button>
        ))}
      {isMobile && (
        <Carousel className="w-full max-w-[400px]">
          <CarouselContent>
            {categories?.map((category, index) => (
              <CarouselItem className="basis-1/3" key={index}>
                <Button variant={"link"} className="w-full px-1">
                  <Link href={`/categories/${category.path}`}>
                    {t(category.name)}
                  </Link>
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default Categories;
