"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import ToggleLangButton from "../globals/ToggleLangButton";
import { Suspense } from "react";

const PostHeader = ({ category, title }: Pick<Post, "category" | "title">) => {
  const categoriesT = useTranslations("LAYOUT.CATEGORIES");

  return (
    <div className="flex items-start justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/categories/${category}`}
              className="capitalize font-medium  text-sm sm:text-lg hover:underline"
            >
              {categoriesT(category.toUpperCase())}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="[&>svg]:size-3 sm:[&>svg]:size-4 mt-1" />
          <BreadcrumbItem className="capitalize font-medium text-sm sm:text-lg">
            {title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={null}>
        <ToggleLangButton />
      </Suspense>
    </div>
  );
};

export default PostHeader;
