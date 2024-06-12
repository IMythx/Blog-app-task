import { getSearchedPosts } from "@/api";
import { useQuery } from "@tanstack/react-query";

const useGetSearchedPosts = ({
  query,
  lang,
}: {
  query: string;
  lang: locales;
}) => {
  return useQuery<Post[]>({
    queryKey: ["searchedQuery", query],
    queryFn: async () => await getSearchedPosts({ lang, query }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export default useGetSearchedPosts;
