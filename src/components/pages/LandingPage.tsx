"use client";

import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import YouTubeIcon from "../ui/icons/YouTubeIcon";
import GitHubIcon from "../ui/icons/GitHubIcon";
import DarkModeToggle from "../ui/selectors/DarkModeToggle";
import LocaleSelector from "../ui/selectors/LocaleSelector";
import ThemeSelector from "../ui/selectors/ThemeSelector";

const GITHUB_URL = "https://github.com/rockstack-dev/nextjs-gear.git";
const YOUTUBE_URL = "https://www.youtube.com/@rockstack-dev";

export default function LandingPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 p-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-xl font-bold sm:text-3xl">Next.js Gear 🦾</h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="ghost" asChild size="sm">
              <Link href={YOUTUBE_URL}>
                <YouTubeIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href={GITHUB_URL}>
                <GitHubIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <LocaleSelector />
            <DarkModeToggle />
            <ThemeSelector />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            The cleanest way to start a{" "}
            <Link href="https://nextjs.org/" className="font-bold text-foreground hover:underline">
              Next.js
            </Link>{" "}
            project with{" "}
            <Link href="https://tailwindcss.com/" className="font-bold text-foreground hover:underline">
              Tailwind CSS
            </Link>
            ,{" "}
            <Link href="https://ui.shadcn.com/" className="font-bold text-foreground hover:underline">
              shadcn/ui
            </Link>
            , and{" "}
            <Link href="https://www.i18next.com/" className="font-bold text-foreground hover:underline">
              i18n
            </Link>
            .
          </div>
          <div>
            <pre className="relative truncate rounded-lg bg-secondary p-2 text-sm text-secondary-foreground">
              <button
                className="absolute right-1 top-1 rounded-lg bg-primary p-1 text-sm text-primary-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${GITHUB_URL}`);
                  toast({ title: "Copied to clipboard" });
                }}
              >
                {t("copy")}
              </button>
              <code className="text-xs">git clone {GITHUB_URL}</code>
            </pre>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2 font-medium" style={{ fontSize: "0.6rem" }}>
                <Link href="https://remix-gear.vercel.app/" className="hover:underline">
                  Remix
                </Link>
                <div>•</div>
                <Link href="https://nextjs-gear.vercel.app/" className="hover:underline">
                  Next.js
                </Link>
              </div>
              <Link href="https://saasrock.com" className="hover:underline" target="_blank">
                {t("sponsoredBy")} <span className="font-bold">SaasRock</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
