import { getAllPosts } from "@/api";
import PostsGrid from "@/components/globals/postsGrid";
import Posts from "@/components/home/posts";
import { getLocale, unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
  searchParams,
  params: { locale },
}: {
  searchParams: { page: string };
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const lang = (await getLocale()) as locales;

  const page = searchParams.page || 1;

  const posts = await getAllPosts({
    lang: lang,
    page: Number(page),
  });

  return (
    <Posts>
      <PostsGrid posts={posts} />
    </Posts>
  );
}
