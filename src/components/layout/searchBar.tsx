import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useGetSearchedPosts from "@/hooks/useGetSearchedPosts";
import { useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

let debounceTime: any;
const SearchBar = () => {
  const [value, setValue] = useState<string>("");

  const [query, setQuery] = useState<string>("");

  const lang = useLocale() as locales;

  const { data, isLoading } = useGetSearchedPosts({ query, lang });

  const router = useRouter();

  useEffect(() => {
    clearTimeout(debounceTime);
    setTimeout(() => setQuery(value), 1000);
  }, [value]);

  return (
    <Command className="rounded-lg border relative !overflow-visible">
      <CommandInput
        onValueChange={setValue}
        value={value}
        placeholder={lang === "en" ? "search..." : "ابحث..."}
        className="rounded-full"
      />

      <CommandList className="absolute top-full inset-x-0 z-50 border bg-white border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        {!isLoading && value && (
          <>
            {data &&
              data?.map((post, index) => (
                <CommandItem
                  className="grid gap-1 cursor-pointer"
                  onClick={() => router.push("/post/" + post.id)}
                >
                  <Highlighter
                    className="truncate max-w-full"
                    searchWords={query.split(" ")}
                    autoEscape={true}
                    textToHighlight={post.title}
                  />
                  <Highlighter
                    className="truncate max-w-full"
                    searchWords={query.split(" ")}
                    autoEscape={true}
                    textToHighlight={post.content}
                  />
                </CommandItem>
              ))}
          </>
        )}
      </CommandList>
    </Command>
  );
};

export default SearchBar;
