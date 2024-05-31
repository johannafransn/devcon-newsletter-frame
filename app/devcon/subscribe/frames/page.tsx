import { currentURL, appURL } from "../../../utils";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Devcon Newsletter Subscription",
    description: "By @johanna",
    other: {
      ...(await fetchMetadata(new URL("/devcon/subscribe/frames", appURL()))),
    },
  };
}

export default async function Home() {
  const url = currentURL("/devcon/subscribe");

  return (
    <div className="">
      <div className="p-5">Coming soon...</div>
    </div>
  );
}
