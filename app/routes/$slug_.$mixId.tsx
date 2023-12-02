import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Mixer from "~/components/Mixer";
import { getInitialState } from "./$slug";
import invariant from "tiny-invariant";
import { initMachine } from "~/machines/mixerMachine";
import { useInterpret } from "@xstate/react";

type Data = {
  sourceSong: any;
  currentMix: any;
  currentTracks: any;
};

export const loader: LoaderFunction = async ({ params: { slug, mixId } }) => {
  if (typeof mixId !== "string") return redirect(`/`);

  invariant(slug, "slug not found");
  const { sourceSong, currentMix, currentTracks } = getInitialState(slug);

  const data: Data = {
    currentTracks,
    currentMix,
    sourceSong,
  };
  return json(data);
};

export default function MixNameRoute() {
  const { sourceSong, currentMix, currentTracks } = useLoaderData();
  const mixerActor = useInterpret(initMachine);
  mixerActor.start();

  mixerActor.subscribe((state) => {
    console.log("state.value", state.value);
    console.log("state.context", state.context);
  });

  if (sourceSong?.tracks.length !== currentTracks.length) {
    if (typeof window === "undefined") return;
    window.location.reload();
  }
  if (typeof window !== "undefined") {
    console.log("currentTracks", currentTracks);

    const value = { sourceSong, currentMix, currentTracks };
    mixerActor.send({ type: "SET_CONTEXT", ...value });
  }

  return <Mixer />;
}
