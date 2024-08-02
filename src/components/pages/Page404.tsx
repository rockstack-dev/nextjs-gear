"use client";

import { useTranslation } from "react-i18next";

interface Props {
  title?: string;
  withLogo?: boolean;
  withFooter?: boolean;
  withGoBack?: boolean;
  customBackButton?: React.ReactNode;
  logo?: string | undefined;
}
export default function Page404({ title, withLogo = true, withFooter = true, withGoBack = true, customBackButton, logo }: Props) {
  const { t } = useTranslation();
  function goBack() {
    window.history.back();
  }
  return (
    <>
      <div className="">
        <div className="flex min-h-full flex-col pb-12 pt-16">
          <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
            {/* {withLogo && <div className="flex flex-shrink-0 justify-center">{logo ? <img className="h-9 w-auto" src={logo} alt="Logo" /> : <Logo />}</div>} */}
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">404 error</p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{title || "Page not found."}</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                {(withGoBack || customBackButton) && (
                  <div className="mt-4">
                    {customBackButton}
                    {!customBackButton && withGoBack && (
                      <button type="button" onClick={goBack} className="w-full text-center text-sm font-medium text-primary hover:text-primary/90">
                        <span aria-hidden="true"> &larr;</span> Go back
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* {withFooter && <FooterBlock />} */}
    </>
  );
}
