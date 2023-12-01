import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import {
  getSourceSong,
  getCurrentMix,
  getCurrentTracks,
} from "@/utils/controls.server";
import invariant from "tiny-invariant";
import { MixerMachineContext } from "~/context/MixerMachineContext";
import localforage from "localforage";
import { extendPrototype } from "localforage-setitems";
extendPrototype(localforage);

type Data = {
  sourceSong: SourceSong | null;
  currentMix: MixSettings | null;
  currentTracks: TrackSettings[];
};

export const loader: LoaderFunction = async ({ params: { slug, mixId } }) => {
  if (typeof mixId !== "string") return redirect(`/`);

  invariant(slug, "slug not found");
  const sourceSong = await getSourceSong(slug);
  const currentMix = await getCurrentMix(mixId);
  let currentTracks = await getCurrentTracks(mixId);

  const data: Data = {
    currentTracks,
    currentMix,
    sourceSong,
  };
  return json(data);
};

export default function MixNameRoute() {
  const { sourceSong, currentMix, currentTracks } = useLoaderData();

  if (sourceSong?.tracks.length !== currentTracks.length) {
    if (typeof window === "undefined") return;
    window.location.reload();
  }
  if (typeof window !== "undefined") {
    localforage
      .setItems({
        sourceSong,
        currentMix,
        currentTracks,
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }

  const trackNames = currentTracks.map((track) => (
    <ul key={track.id}>
      <li>track name: {track.name}</li>
      <li>track volume: {track.volume}</li>
    </ul>
  ));
  return (
    <MixerMachineContext.Provider>{trackNames}</MixerMachineContext.Provider>
  );
}
