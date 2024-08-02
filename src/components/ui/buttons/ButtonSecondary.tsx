import { MouseEventHandler, ReactNode } from "react";
import LinkOrAhref from "./LinkOrAhref";
import { Button } from "../button";
import clsx from "clsx";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
  target?: undefined | "_blank";
  rel?: string;
  disabled?: boolean;
  destructive?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  prefetch?: boolean;
}

export default function ButtonSecondary({
  className = "",
  type = "button",
  onClick,
  disabled,
  destructive,
  to,
  target,
  rel,
  children,
  isLoading,
  prefetch,
}: Props) {
  return (
    <span>
      {(() => {
        if (!to || disabled) {
          return (
            <Button
              variant={destructive ? "destructive" : "secondary"}
              onClick={onClick}
              type={type}
              disabled={disabled || isLoading}
              className={clsx("inline-flex items-center space-x-2", className)}
            >
              {children}
            </Button>
          );
        } else {
          return (
            <Button asChild variant="secondary">
              <LinkOrAhref to={to} target={target} rel={rel} prefetch={prefetch} className={clsx("inline-flex items-center space-x-2", className)}>
                {children}
              </LinkOrAhref>
            </Button>
          );
        }
      })()}
    </span>
  );
}
