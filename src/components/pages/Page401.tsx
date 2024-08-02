"use client";

import { useTranslation } from "react-i18next";

interface Props {
  withFooter?: boolean;
}
export default function Page401({ withFooter = true }: Props) {
  const { t } = useTranslation();
  function goBack() {
    window.history.back();
  }
  return (
    <>
      <div className="">
        <div className="flex min-h-full flex-col pb-12 pt-16">
          <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-shrink-0 justify-center">{/* <Logo /> */}</div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Unauthorized</p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">You're not authorized to see this page.</h1>
                <p className="mt-2 text-base text-gray-500">Contact your admin and verify your permissions.</p>
                <div className="mt-4 flex">
                  <button type="button" onClick={goBack} className="w-full text-center text-sm font-medium text-primary hover:text-primary/90">
                    <span aria-hidden="true"> &larr;</span> Go back
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
