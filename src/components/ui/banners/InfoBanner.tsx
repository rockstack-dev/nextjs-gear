import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface Props {
  title: ReactNode;
  text?: ReactNode | string;
  children?: ReactNode;
}

export default function InfoBanner({ title = "Note", text = "", children }: Props) {
  const { t } = useTranslation();
  return (
    <div className="not-prose rounded-md border border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900">
      <div className="rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400 dark:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="ml-3 w-full">
            <h3 className="text-sm font-medium leading-5 text-blue-900 dark:text-blue-50">{title}</h3>
            <div className="mt-2 text-sm leading-5 text-blue-800 dark:text-blue-100">
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
