import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { MixerMachineContext } from "~/context/MixerMachineContext";
import localforage from "localforage";
import { extendPrototype } from "localforage-setitems";
import { aDayInTheLife, everlong, roxanne } from "~/assets/songs";
import { defaultTrackData } from "~/assets/songs/defaultData";
extendPrototype(localforage);

export const loader: LoaderFunction = async ({ params: { slug, mixId } }) => {
  if (typeof mixId !== "string") return redirect(`/`);

  invariant(slug, "slug not found");
  let sourceSong = roxanne;

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

  const mixSettings = {
    id: "lk4j3l4j",
    mixName: "Test Mix",
    volume: -32,
  };

  const currentTracks = sourceSong.tracks.map((track) => ({
    mixSettingsId: mixSettings.id,
    songSlug: slug as string,
    name: track.name,
    mixName: mixSettings.mixName,
    path: track.path,
    ...defaultTrackData,
  }));

  const data: Data = {
    currentTracks,
    currentMix: mixSettings,
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

  const trackNames = currentTracks.map((track, i) => (
    <ul key={i}>
      <li>track name: {track.name}</li>
      <li>track volume: {track.volume}</li>
    </ul>
  ));
  return (
    <MixerMachineContext.Provider>{trackNames}</MixerMachineContext.Provider>
  );
}
