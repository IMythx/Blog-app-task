interface Post {
  title: string;
  content: string;
  thumbnail: string;
  language: string;
  category: string;
  id: number;
  createdAt: Date;
  readingTime: string;
}

type locales = "en" | "ar";
