import { generateSlug } from "random-word-slugs";
import { v4 as uuid } from "uuid";
import { aDayInTheLife, everlong, roxanne } from "~/assets/songs";

// const sleep = (delay: number) =>
//   new Promise((resolve) => setTimeout(resolve, delay));

export async function getInitialState(slug: string) {
  let sourceSong;
  switch (slug) {
    case "roxanne":
      // await sleep(1000);
      sourceSong = roxanne;
      break;
    case "aDayInTheLife":
      // await sleep(1000);
      sourceSong = aDayInTheLife;
      break;
    case "everlong":
      // await sleep(2000);
      sourceSong = everlong;
      break;
    default:
      break;
  }
  const currentMix = {
    id: uuid(),
    songSlug: slug as string,
    volume: -32,
    coverArt: 5,
    mixName: generateSlug(),
  };
  const currentTracks = sourceSong?.tracks.map((track) => ({
    id: uuid(),
    mixSettingsId: currentMix.id,
    songSlug: slug as string,
    name: track.name,
    mixName: currentMix.mixName,
    path: track.path,
    volume: -32,
  }));
  return { sourceSong, currentMix, currentTracks };
}
