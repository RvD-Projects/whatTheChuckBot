import { Event } from "../../../src/class/event";
import { YoutubeFetcher } from "../class/youtubeFetcher";

export default new Event("shardReady", async () => {
  try {
    const fetcher = new YoutubeFetcher;
    setInterval(async () => await fetcher.getVideos(), 3600000);

    await fetcher.getVideos();
  } catch (error) {
    console.error(error);
  }
});
