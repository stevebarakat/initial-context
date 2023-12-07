import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Mixer from "~/components/Mixer";
import { getInitialState } from "~/utils/initialState";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params: { slug, mixId } }) => {
  if (typeof mixId !== "string") return redirect(`/`);

  invariant(slug, "slug not found");
  const { sourceSong, currentMix, currentTracks } = await getInitialState(slug);

  const data: InitialContext = {
    sourceSong,
    currentMix,
    currentTracks,
  };
  return json(data);
};

export default function MixNameRoute() {
  const { sourceSong, currentMix, currentTracks } =
    useLoaderData<typeof loader>();

  if (sourceSong?.tracks.length !== currentTracks.length) {
    if (typeof window === "undefined") return;
    window.location.reload();
  }
  if (typeof window !== "undefined") {
    console.log("currentTracks", currentTracks);
  }
  const initialContext = {
    sourceSong,
    currentMix,
    currentTracks,
  };

  return <Mixer initialContext={initialContext} />;
}
