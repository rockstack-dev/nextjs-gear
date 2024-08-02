import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { Button } from "../button";
import Link from "next/link";

interface Props {
  type?: "button" | "submit";
  to: string | undefined;
  children: ReactNode;
  className?: string;
  target?: undefined | "_blank" | string;
  role?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  autoFocus?: boolean;
  prefetch?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}
export default function LinkOrAhref({ type = "button", to, target, children, className, role, rel, onClick, autoFocus, prefetch, disabled, isLoading }: Props) {
  return (
    <Fragment>
      {(!to && !onClick) || (to && disabled) ? (
        <div className={className} role={role} autoFocus={autoFocus}>
          {children}
        </div>
      ) : to == undefined ? (
        <Button
          type={type}
          onClick={onClick}
          className={clsx(className, isLoading && "base-spinner cursor-not-allowed")}
          role={role}
          autoFocus={autoFocus}
          disabled={disabled}
        >
          {children}
        </Button>
      ) : (
        <Link onClick={onClick} href={to} target={target} className={className} role={role} autoFocus={autoFocus} prefetch={prefetch} rel={rel}>
          {children}
        </Link>
      )}
    </Fragment>
  );
}
