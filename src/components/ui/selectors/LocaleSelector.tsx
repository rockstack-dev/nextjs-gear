"use client";

import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Fragment } from "react";

import { useRouter } from "next/navigation";
import i18next from "i18next";
import { languages } from "@/i18n/settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";

interface Props {
  className?: string;
  disabled?: boolean;
}

export default function LocaleSelector({ className, disabled }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const select = (lang: string) => {
    i18next.changeLanguage(lang);
    router.refresh();
  };

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button variant="ghost" size="sm">
            <div className={clsx("inline-flex flex-shrink-0 items-center rounded-full text-xs font-medium text-muted-foreground")}>
              {/* {t(i18n.language)} */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {languages.map((language, index) => {
              return (
                <DropdownMenuItem key={index} onClick={() => select(language)}>
                  {t("locales." + language)}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}
