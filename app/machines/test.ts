import { createMachine } from "xstate";
import { currentTracks, currentMix, sourceSong } from "./init.client";
import localforage from "localforage";
import { extendPrototype } from "localforage-getitems";
extendPrototype(localforage);

const initialContext = {
  sourceSong,
  currentMix,
  currentTracks,
};

console.log("initialContext", initialContext);

console.log("initialContext.sourceSong", initialContext.sourceSong);

// initialContext.sourceSong.then((song) => console.log("song", song));

export const mixerMachine = createMachine({
  id: "mixer",
  // context: initialContext,
  predictableActionArguments: true,
});
