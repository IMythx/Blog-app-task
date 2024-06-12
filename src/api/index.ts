import { notFound } from "next/navigation";

const baseUrl = `https://${process.env.NEXT_PUBLIC_SECRET_KEY}.mockapi.io/v1`;

export const getAllPosts = async ({
  lang,
  page = 1,
  noLimit = false,
}: {
  lang: locales;
  page?: number;
  noLimit?: boolean;
}): Promise<Post[]> => {
  const urlWithLimit = `${baseUrl}/${lang}Posts?page=${page}&limit=12`;
  const urlWithoutLimit = `${baseUrl}/${lang}Posts`;
  try {
    const res: Response = await fetch(
      noLimit ? urlWithoutLimit : urlWithLimit,
      {
        cache: "no-store",
      }
    );
    return await res.json();
  } catch (e) {
    return notFound();
  }
};

export const getPostsByCategory = async ({
  lang,
  page,
  category,
}: {
  lang: locales;
  page: number;
  category: string;
}): Promise<Post[]> => {
  try {
    const res: Response = await fetch(
      `${baseUrl}/${lang}Posts?page=${page}&limit=10&category=${category}`
    );
    return await res.json();
  } catch (e) {
    return notFound();
  }
};

export const getPostById = async ({
  lang,
  id,
}: {
  lang: locales;
  id: number;
}): Promise<Post> => {
  try {
    const res: Response = await fetch(`${baseUrl}/${lang}Posts/${id}`);
    return await res.json();
  } catch (e) {
    return notFound();
  }
};

export const getSearchedPosts = async ({
  lang,
  query,
}: {
  lang: locales;
  query: string;
}): Promise<Post[]> => {
  try {
    const res: Response = await fetch(
      `${baseUrl}/${lang}Posts?search=${query}`
    );
    return await res.json();
  } catch (e) {
    return notFound();
  }
};
