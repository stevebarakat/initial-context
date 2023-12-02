import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { defaultTrackData } from "@/assets/songs/defaultData";
import { generateSlug } from "random-word-slugs";
import { v4 as uuid } from "uuid";
import { aDayInTheLife, everlong, roxanne } from "~/assets/songs";

export function getInitialState(slug: string) {
  let sourceSong;
  switch (slug) {
    case "roxanne":
      sourceSong = roxanne;
      break;
    case "aDayInTheLife":
      sourceSong = aDayInTheLife;
      break;
    case "everlong":
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
