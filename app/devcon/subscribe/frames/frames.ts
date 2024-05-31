import { createFrames } from "frames.js/next";
import { appURL } from "../../../utils";

export const frames = createFrames({
  basePath: "/devcon/subscribe/frames/",
  baseUrl: appURL(),
});
