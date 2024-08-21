import useGetSearchedPosts from "@/hooks/useGetSearchedPosts";
import { Link, usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { Input } from "@/components/ui/input";

let debounceTime: any;
const SearchBar = () => {
  const [value, setValue] = useState<string>("");

  const [query, setQuery] = useState<string>("");

  const lang = useLocale() as locales;

  const pathName = usePathname();

  const { data } = useGetSearchedPosts({ query, lang });

  const router = useRouter();

  useEffect(() => {
    setValue("");
  }, [pathName]);

  useEffect(() => {
    clearTimeout(debounceTime);
    debounceTime = setTimeout(() => setQuery(value), 1000);
  }, [value]);

  return (
    <div className="relative w-full max-w-[800px]">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={lang === "en" ? "search..." : "ابحث..."}
        className="focus-visible:"
      />
      {value && data && (
        <div className="!absolute z-50 bg-white inset-x-0 top-[105%] min-h-fit overflow-y-auto max-h-[500px] border border-top-0 rounded-lg rounded-tl-none rounded-tr-none">
          <div className="grid">
            {Array.isArray(data) &&
              data?.map((post, index) => (
                <Link
                  href={`/post/${post.id}`}
                  className="hover:bg-stone-100 py-2 grid gap-1 px-2"
                  key={index}
                >
                  <Highlighter
                    className="truncate max-w-full font-bold"
                    searchWords={query.split(" ")}
                    autoEscape={true}
                    textToHighlight={post.title}
                  />
                  <Highlighter
                    className="truncate max-w-full text-slate-400"
                    searchWords={query.split(" ")}
                    autoEscape={true}
                    textToHighlight={post.content}
                  />
                </Link>
              ))}{" "}
            {value && !Array.isArray(data) && (
              <p className="w-full text-center my-10 font-bold">Not found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
