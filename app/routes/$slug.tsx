import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { defaultTrackData } from "@/assets/songs/defaultData";
import { roxanne } from "~/assets/songs";

export const action: ActionFunction = async ({ params: { slug } }) => {
  const sourceSong = roxanne;

  const mixSettings = {
    id: "lk4j3l4j",
    mixName: "Test Mix",
    volume: -32,
  };

  sourceSong?.tracks.forEach(async (track) => ({
    mixSettingsId: mixSettings.id,
    songSlug: slug as string,
    name: track.name,
    mixName: mixSettings.mixName,
    path: track.path,
    ...defaultTrackData,
  }));

  return redirect(`/${slug}/${mixSettings.id}`);
};
