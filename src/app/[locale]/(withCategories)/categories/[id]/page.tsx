import { getPostsByCategory } from "@/api";
import PostsGrid from "@/components/globals/postsGrid";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: id,
  };
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const lang = (await getLocale()) as locales;

  const posts = await getPostsByCategory({ page: 1, lang, category: id });

  const t = await getTranslations("HOME.CATEGORIES");
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
