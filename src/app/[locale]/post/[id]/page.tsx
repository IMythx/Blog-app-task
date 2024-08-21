import { getAllPosts, getPostById } from "@/api";
import { getLocale, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import PostHeader from "@/components/post/header";
import { Metadata } from "next";
import { formatDate } from "@/lib/formatDate";

type Props = { params: { id: string; locale: locales } };

export async function generateMetadata({
  params: { id, locale: lang },
}: Props): Promise<Metadata> {
  const post = await getPostById({
    lang,
    id: +id,
  });
  return {
    title: post.title,
    description: post.content,
    openGraph: {
      images: [post.thumbnail],
    },
    category: post.category,
    keywords: post.category,
    robots: {
      follow: true,
      index: true,
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts({
    lang: "en",
    noLimit: true,
  });

  return posts.map((post) => ({ id: post.id }));
}

const Page = async ({ params: { locale, id } }: Props) => {
  unstable_setRequestLocale(locale);

  const lang = (await getLocale()) as locales;

  const post = await getPostById({
    lang,
    id: +id,
  });
  const dir = lang === "ar" ? "rtl" : "ltr";
  const categoriesT = await getTranslations("LAYOUT.CATEGORIES");
  return (
    <div className="grid gap-8 my-4 sm:my-10 px-4 sm:px-10" dir={dir}>
      <PostHeader category={post?.category} title={post?.title} />
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
        <div className="relative w-full h-[40vh]">
          <Image
            src={post?.thumbnail}
            fill
            alt={post?.title}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="grid gap-4 sm:gap-10 w-full">
          <h2 className="font-bold text-xl sm:text-3xl">{post?.title}</h2>
          <div className="grid gap-1">
            <p className="text-slate-400 text-sm sm:text-base">
              {post?.readingTime} min read
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              {formatDate(post?.createdAt)}
            </p>
          </div>

          <div className="flex items-center justify-center text-sm sm:text-base px-4 py-2 rounded-full bg-stone-100 w-fit capitalize">
            {categoriesT(post?.category?.toUpperCase())}
          </div>
          <p className="text-slate-400 text-sm sm:text-lg">{post?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
