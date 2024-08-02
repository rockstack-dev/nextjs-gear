import { ReactNode } from "react";
import LinkOrAhref from "./LinkOrAhref";
import clsx from "clsx";

const DEBUG_MODE = false;

interface Props {
  type?: "button" | "submit";
  to?: string | undefined;
  children: ReactNode;
  className?: string;
  target?: undefined | "_blank";
  role?: string;
  rel?: string;
  event: {
    action: string;
    category: string;
    label: string;
    value: string;
  };
  onClick?: () => void;
  sendEvent?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}
export default function ButtonEvent({ type, to, target, children, className, role, rel, event, onClick, sendEvent = true, disabled, isLoading }: Props) {
  function onClicked() {
    if (onClick) {
      onClick();
    }
    if (!event || !sendEvent) {
      return;
    }
  }
  return (
    <LinkOrAhref
      type={type}
      to={to}
      target={target}
      className={clsx(className, DEBUG_MODE && "ring-2 ring-red-500 ring-offset-2")}
      role={role}
      rel={rel}
      onClick={onClicked}
      disabled={disabled}
      isLoading={isLoading}
    >
      {children}
    </LinkOrAhref>
  );
}
