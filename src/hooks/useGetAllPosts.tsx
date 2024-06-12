import { getAllPosts } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const useGetAllPosts = ({ page }: { page: number }) => {
  const lang = useLocale() as locales;

  return useQuery<Post[]>({
    queryKey: ["posts", page],
    queryFn: async () =>
      await getAllPosts({
        lang: lang,
        page,
      }),
    retryOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetAllPosts;
