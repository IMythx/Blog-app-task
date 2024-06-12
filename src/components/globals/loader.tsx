"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";

const Loader = ({
  className,
  iconWidth,
  iconHeight,
}: {
  className?: string;
  iconWidth?: number;
  iconHeight?: number;
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <div
      className={cn(
        "flex items-center justify-center my-[10rem] sm:my-[20rem]",
        className
      )}
    >
      <ReloadIcon
        className="animate-spin"
        width={iconWidth || isMobile ? 20 : 30}
        height={iconHeight || isMobile ? 20 : 30}
      />
    </div>
  );
};

export default Loader;
