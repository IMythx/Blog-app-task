import { getAllPosts, getPostsByCategory } from "@/api";
import PostsGrid from "@/components/globals/postsGrid";
import { Metadata } from "next";
import {
  getLocale,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: id,
  };
}
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts({
    lang: "en",
    noLimit: true,
  });

  let categories: Set<string> = new Set();

  posts.map((post) => categories.add(post.category));

  return Array.from(categories).map((category) => ({ id: category }));
}
const Page = async ({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) => {
  unstable_setRequestLocale(locale);
  const lang = (await getLocale()) as locales;

  const posts = await getPostsByCategory({ page: 1, lang, category: id });

  const t = await getTranslations("LAYOUT.CATEGORIES");
  return (
    <div className="grid gap-8">
      <h1 className="font-bold text-4xl capitalize px-4 sm:px-10">
        {" "}
        {t(id.toUpperCase())}
      </h1>
      <PostsGrid posts={posts!} />
    </div>
  );
};

export default Page;
