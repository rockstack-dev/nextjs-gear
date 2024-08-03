import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/themes.css";
import { dir } from "i18next";
import { detectLanguage, getServerTranslations } from "@/i18n/server";
import { I18nProvider } from "@/i18n/i18n-context";
import { getUserInfo } from "@/lib/session";
import clsx from "clsx";
import { Metadata } from "next";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: "Next.js Gear",
    icons: [
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lng = await detectLanguage();
  const userInfo = getUserInfo();
  const scheme = userInfo?.scheme || "light";

  return (
    <I18nProvider language={lng}>
      <html lang={lng} dir={dir(lng)} className={scheme === "dark" ? "dark" : ""}>
        <body className={clsx(`theme-${userInfo.theme}`, "max-h-full min-h-screen max-w-full bg-background text-foreground", inter.style)}>
          {children}
          <SonnerToaster />
        </body>
      </html>
    </I18nProvider>
  );
}
