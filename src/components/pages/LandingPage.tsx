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
import TwitterIcon from "../ui/icons/TwitterIcon";

const GITHUB_URL = "https://github.com/rockstack-dev/nextjs-gear.git";
const YOUTUBE_URL = "https://www.youtube.com/@rockstack-dev";
const TWITTER_URL = "https://twitter.com/AlexandroMtzG";

export default function LandingPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 p-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-2xl font-bold sm:text-3xl">Next.js Gear 🦾</h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="ghost" asChild size="sm">
              <Link href={YOUTUBE_URL} target="_blank">
                <YouTubeIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href={GITHUB_URL} target="_blank">
                <GitHubIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href={TWITTER_URL} target="_blank">
                <TwitterIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <LocaleSelector />
            <DarkModeToggle />
            <ThemeSelector />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">
            The cleanest way to start a{" "}
            <Link href="https://nextjs.org/" className="font-bold text-foreground hover:underline" target="_blank">
              Next.js
            </Link>{" "}
            project with{" "}
            <Link href="https://tailwindcss.com/" className="font-bold text-foreground hover:underline" target="_blank">
              Tailwind CSS
            </Link>
            ,{" "}
            <Link href="https://ui.shadcn.com/" className="font-bold text-foreground hover:underline" target="_blank">
              shadcn/ui
            </Link>
            , and{" "}
            <Link href="https://github.com/sergiodxa/remix-i18next" className="font-bold text-foreground hover:underline" target="_blank">
              i18n
            </Link>
            .
          </div>
          <div className="space-y-2">
            <pre className="relative truncate rounded-lg bg-secondary p-2 text-secondary-foreground">
              <button
                className="absolute right-1 top-1 rounded-lg bg-primary p-1 text-primary-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${GITHUB_URL}`);
                  toast({
                    title: "Copied to clipboard",
                  });
                }}
              >
                {t("copy")}
              </button>
              <code className="text-sm">git clone {GITHUB_URL}</code>
            </pre>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 font-medium">
                <Link href="https://remix-gear.vercel.app/" className="hover:underline">
                  Remix
                </Link>
                <div>•</div>
                <Link href="https://nextjs-gear.vercel.app/" className="hover:underline">
                  Next.js
                </Link>
              </div>
              <Link href="https://saasrock.com/?ref=nextjs-gear" className="text-muted-foreground hover:underline" target="_blank">
                {t("by")} <span className="font-bold">SaasRock</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2 pt-12">
            <h3 className="text-sm font-bold">Demos</h3>
            <div className="grid grid-cols-3 gap-4">
              <Link
                href="/forms"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">Form actions</div>
              </Link>
              <Link
                href="/ai-structured-outputs"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">AI: Structured Outputs</div>
              </Link>
              <Link
                href="https://twitter.com/AlexandroMtzG"
                target="_blank"
                className="h-12 rounded-md border border-dashed border-border bg-background p-3 text-primary opacity-50 hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">Let me know!</div>
              </Link>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
