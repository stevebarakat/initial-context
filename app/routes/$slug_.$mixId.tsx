import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Mixer from "~/components/Mixer";
import {
  getSourceSong,
  getCurrentMix,
  getCurrentTracks,
} from "@/utils/controls.server";
import invariant from "tiny-invariant";
import { initMachine } from "~/machines/initMachine";
import localforage from "localforage";
import { extendPrototype } from "localforage-setitems";
import { interpret } from "xstate";
extendPrototype(localforage);

type Data = {
  sourceSong: any;
  currentMix: any;
  currentTracks: any;
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
  const initActor = interpret(initMachine);
  initActor.start();

  initActor.subscribe((state) => {
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
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(value), 1000);
    });
    promise.then((val) => {
      console.log("val", val);
      return initActor.send({ type: "SET_CONTEXT", value: val });
    });
  }

  return <Mixer />;
}
