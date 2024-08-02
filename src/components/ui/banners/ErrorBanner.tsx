import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface Props {
  title: ReactNode;
  text?: ReactNode | string;
  children?: ReactNode;
}

export default function ErrorBanner({ title = "Error", text = "", children }: Props) {
  const { t } = useTranslation();
  return (
    <div className="not-prose rounded-md border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900">
      <div className="rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="ml-3">
            <h3 className="text-sm font-medium leading-5 text-red-800 dark:text-red-100">{title}</h3>
            <div className="mt-2 text-sm leading-5 text-red-700 dark:text-red-300">
              <div>
                {text} {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
