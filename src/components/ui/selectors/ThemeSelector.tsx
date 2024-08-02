"use client";

import clsx from "clsx";
import { Fragment } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../select";
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
import { actionSetTheme } from "@/app/(marketing)/actions";
import { defaultThemeColor, defaultThemes } from "@/lib/theme";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  currentTheme?: string;
}

export default function ThemeSelector({ className, variant = "primary", disabled, currentTheme }: Props) {
  const pathname = usePathname();
  async function select(value: string) {
    const form = new FormData();
    form.set("theme", value);
    form.set("redirectTo", pathname || "/");
    actionSetTheme(form);
  }

  return (
    <Fragment>
      {variant === "primary" || variant === "secondary" ? (
        <DropdownMenu>
          <DropdownMenuTrigger disabled={disabled} className={clsx(className, "select-none")} asChild>
            <Button variant="ghost" size="sm">
              {variant === "primary" ? (
                <div className={clsx("inline-flex flex-shrink-0 items-center rounded-full text-xs font-medium text-primary")}>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <line
                      x1="208"
                      y1="128"
                      x2="128"
                      y2="208"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                    <line
                      x1="192"
                      y1="40"
                      x2="40"
                      y2="192"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                  </svg>
                </div>
              ) : (
                variant === "secondary" && (
                  <span className={clsx("inline-flex flex-shrink-0 items-center rounded-full bg-primary text-xs font-medium text-primary")}>
                    <svg className={clsx("h-2 w-2")} fill="currentColor" viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                  </span>
                )
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {defaultThemes.map((f) => {
                return (
                  <DropdownMenuItem key={f.name} onClick={() => select(f.value)}>
                    <div className="flex items-center space-x-2">
                      <label
                        className={clsx(
                          `theme-${f.value}`,
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-ring focus:outline-none"
                        )}
                      >
                        <span id="color-choice-0-label" className="sr-only">
                          {f.name}
                        </span>
                        <span aria-hidden="true" className={clsx("h-3 w-3 rounded-full border border-border", "border-primary bg-primary")}></span>
                      </label>
                      <div>
                        {f.name}
                        {f.value === defaultThemeColor ? " (default)" : ""}
                      </div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : variant === "tertiary" ? (
        <Select value={currentTheme} onValueChange={(e) => select(e.toString())}>
          <SelectTrigger className={className}>
            <SelectValue
              placeholder={
                <div className="p-0.5">
                  <span className={clsx("inline-flex flex-shrink-0 items-center rounded-full text-xs font-medium text-primary")}>
                    <svg className={clsx("h-3 w-3")} fill="currentColor" viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {defaultThemes.map((item, idx) => {
                return (
                  <SelectItem key={idx} value={item.value}>
                    {item.name}
                    {item.value === defaultThemeColor ? " (default)" : ""}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}
    </Fragment>
  );
}
