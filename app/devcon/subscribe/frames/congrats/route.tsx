import { subscribeToNewsletter } from "../../../../utils";
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  console.log(ctx, "what is ctx?");

  if (!ctx.message?.inputText || !ctx.message) {
    throw new Error("Could not find CTX data or inputtext");
  }

  const isValidEmail = await subscribeToNewsletter(ctx.message.inputText);

  if (isValidEmail) {
    return {
      image: "https://i.ibb.co/Qb99B4h/image.png",

      buttons: [
        // With query params
        <Button action="link" target={`https://devcon.org/`}>
          CHECK OUT DEVCON 2024 ⭐️
        </Button>,

        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Subscribe%20To%20Devcon%202024%20Newsletter&embeds[]=${process.env.APP_URL}/devcon/subscribe/frames/start`}
        >
          SHARE THIS FRAME 🚀
        </Button>,
      ],
    };
  } else {
    return {
      image: "https://i.ibb.co/9Y7dmD1/image.png",

      buttons: [
        <Button
          action="post"
          target={{ pathname: `start`, query: { foo: "bar" } }}
        >
          TRY AGAIN 🚀
        </Button>,
        <Button action="link" target={`https://devcon.org/`}>
          CHECK OUT DEVCON 2024 ⭐️
        </Button>,
      ],
    };
  }
});
