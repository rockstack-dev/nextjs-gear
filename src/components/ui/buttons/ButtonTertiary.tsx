import { MouseEventHandler, ReactNode, useRef } from "react";
import clsx from "clsx";
import LinkOrAhref from "./LinkOrAhref";
import { Button } from "../button";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
  target?: undefined | "_blank";
  rel?: string;
  disabled?: boolean;
  destructive?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  prefetch?: boolean;
  event?: { action: string; category: string; label: string; value: string };
  sendEvent?: boolean;
}

export default function ButtonTertiary({
  className = "",
  type = "button",
  onClick,
  disabled,
  destructive,
  to,
  target,
  rel,
  children,
  prefetch,
  event,
  sendEvent,
}: Props) {
  const { t } = useTranslation();

  function onClicked(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (onClick) {
      onClick(e);
    }
    if (!event || !sendEvent) {
      return;
    }
  }
  return (
    <span>
      {(() => {
        if (!to || disabled) {
          return (
            <Button
              variant={"ghost"}
              className={clsx(className, destructive && "text-red-500 hover:bg-red-50 hover:text-red-600")}
              onClick={onClicked}
              type={type}
              disabled={disabled}
              // className={clsx(
              //   className,
              //   "focus:ring-accent-300 mx-1 my-2 inline-flex items-center space-x-2 border-b border-transparent text-sm font-medium focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
              //   disabled ? "cursor-not-allowed opacity-75" : "hover:border-dotted",
              //   !destructive && "text-theme-700 border-b ",
              //   destructive && "text-red-600",
              //   !disabled && !destructive && !className && "hover:text-theme-800 focus:text-theme-900 ",
              //   !disabled && destructive && "hover:border-red-300 hover:text-red-800 focus:text-red-900"
              // )}
            >
              {children}
            </Button>
          );
        } else {
          return (
            <Button asChild variant={"ghost"} className={clsx(destructive && "text-red-500")}>
              <LinkOrAhref
                to={to}
                target={target}
                rel={rel}
                prefetch={prefetch}
                className={clsx(className)}
                // className={clsx(
                //   className,
                //   "focus:ring-accent-300 mx-1 my-2 inline-flex items-center space-x-2 border-b border-transparent text-sm font-medium focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
                //   disabled ? "cursor-not-allowed opacity-75" : " hover:border-dotted",
                //   !destructive && "text-theme-700 border-b ",
                //   destructive && "text-red-600",
                //   !disabled && !destructive && !className && "hover:text-theme-800 focus:text-theme-900 ",
                //   !disabled && destructive && "hover:border-red-300 hover:text-red-800 focus:text-red-900"
                // )}
              >
                {children}
              </LinkOrAhref>
            </Button>
          );
        }
      })()}
    </span>
  );
}
