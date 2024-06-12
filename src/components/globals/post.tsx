import { Link } from "@/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/formatDate";
import { useTranslations } from "next-intl";

const Post = ({ title, thumbnail, id, content, createdAt, category }: Post) => {
  const t = useTranslations("HOME.CATEGORIES");
  return (
    <Link
      href={`/post/${id}`}
      className="grid gap-4 rounded-lg group overflow-hidden shadow-md hover:shadow-lg"
    >
      <AspectRatio ratio={1 / 0.8} className="relative  overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-all duration-200 group-hover:scale-105"
        />
      </AspectRatio>
      <div className="grid gap-3 sm:gap-4 p-4">
        <Link
          href={`/categories/${category}`}
          className="hover:underline px-4 py-1 bg-stone-100 rounded-full w-fit text-sm sm:text-base"
        >
          {t(category.toUpperCase())}
        </Link>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="truncate max-w-full font-bold text-sm sm:text-base">
              {title}
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="line-clamp-3 max-w-full text-slate-400 text-sm sm:text-base">
          {content}
        </p>{" "}
        <p className="text-slate-400 text-sm sm:text-base">
          {formatDate(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default Post;
