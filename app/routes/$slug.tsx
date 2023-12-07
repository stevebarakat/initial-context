import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { defaultTrackData } from "@/assets/songs/defaultData";
import { generateSlug } from "random-word-slugs";
import { v4 as uuid } from "uuid";
import { aDayInTheLife, everlong, roxanne } from "~/assets/songs";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export async function getInitialState(slug: string) {
  let sourceSong;
  switch (slug) {
    case "roxanne":
      await sleep(2000);
      sourceSong = roxanne;
      break;
    case "aDayInTheLife":
      await sleep(3000);
      sourceSong = aDayInTheLife;
      break;
    case "everlong":
      await sleep(4000);
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
    mixSettingsId: currentMix.id,
    songSlug: slug as string,
    name: track.name,
    mixName: currentMix.mixName,
    path: track.path,
    ...defaultTrackData,
  }));
  return { sourceSong, currentMix, currentTracks };
}

export const action: ActionFunction = async ({ params: { slug } }) => {
  const { sourceSong, currentMix, currentTracks } = getInitialState(slug);

  return redirect(`/${slug}/${currentMix?.id}`);
};
