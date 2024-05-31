/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { getFrameImageUrl } from "../../images";

const handler = frames(async (ctx) => {
  return {
    image: "https://i.ibb.co/q1dt4XQ/image.png",

    buttons: [
      // With query params

      <Button
        action="post"
        target={{ pathname: `congrats/`, query: { foo: "bar" } }}
      >
        🌟 SUBSCRIBE NOW 🌟
      </Button>,
    ],
    textInput: "Your email...",
    headers: {
      // Max cache age in seconds
      "Cache-Control": "max-age=0",
    },
  };
});

export const GET = handler;
export const POST = handler;
