import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Mixer from "~/components/Mixer";
import { getInitialState } from "./$slug";
import invariant from "tiny-invariant";

type Data = {
  sourceSong: any;
  currentMix: any;
  currentTracks: any;
};

export const loader: LoaderFunction = async ({ params: { slug, mixId } }) => {
  if (typeof mixId !== "string") return redirect(`/`);

  invariant(slug, "slug not found");
  const { sourceSong, currentMix, currentTracks } = await getInitialState(slug);

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
    console.log("currentTracks", currentTracks);
  }

  return <Mixer />;
}
