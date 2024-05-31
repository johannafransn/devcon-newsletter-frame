import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";

import { appURL, currentURL } from "./utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "frames.js starter",
    description: "This is a frames.js starter template",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  };
}

// This is a react server component only
export default async function Home() {
  const url = currentURL("/");

  // then, when done, return next frame
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="p-4 text-center bg-containerGray rounded-2xl border border-subContainerGray">
          <p className="mt-3 mb-3"></p>

          <a href="/devcon/subscribe/frames" className="underline">
            Devcon 2024
          </a>
        </div>
      </div>
    </div>
  );
}
