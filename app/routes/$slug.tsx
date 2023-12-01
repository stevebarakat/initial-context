import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { generateRandomNumber } from "@/utils";
import { prisma } from "@/utils/db.server";
import { defaultTrackData } from "@/assets/songs/defaultData";
import { generateSlug } from "random-word-slugs";
import { getSourceSong } from "~/utils/controls.server";

export const action: ActionFunction = async ({ params: { slug } }) => {
  const sourceSong = await getSourceSong(slug);

  const mixSettings = await prisma.mixSettings.create({
    data: {
      songSlug: slug as string,
      volume: -32,
      coverArt: generateRandomNumber(1, 9).toString(),
      mixName: generateSlug(),
    },
  });

  sourceSong?.tracks.forEach(async (track) => {
    await prisma.trackSettings.create({
      data: {
        mixSettingsId: mixSettings.id,
        songSlug: slug as string,
        name: track.name,
        mixName: mixSettings.mixName,
        path: track.path,
        ...defaultTrackData,
      },
    });
  });

  return redirect(`/${slug}/${mixSettings.id}`);
};
