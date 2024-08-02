import { getServerTranslations } from "@/i18n/server";
import { Metadata } from "next/types";
import LandingPage from "@/components/pages/LandingPage";

export async function generateMetadata() {
  const { t } = await getServerTranslations();
  const metadata: Metadata = {
    title: "Next.js Gear",
  };
  return metadata;
}

export default async function Index() {
  return <LandingPage />;
}
