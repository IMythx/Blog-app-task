import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Providers from "@/providers";
import { locales } from "@/config";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

export const metadata: Metadata = {
  title: "Blog app",
  description: "sllm blog app task",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={cn(
          "min-h-screen bg-background font-inter antialiased max-w-[1440px] mx-auto",
          inter.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main>{children}</main>
          </Providers>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
