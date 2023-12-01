import { assign, createMachine } from "xstate";
import { produce } from "immer";

export const initMachine = createMachine(
  {
    id: "init",
    initial: "idle",
    states: {
      idle: { on: { SET_CONTEXT: { actions: "setContext" } } },
      selected: { on: { RESET: "idle" } },
    },
    context: {
      sourceSong: undefined,
      currentMix: undefined,
      currentTracks: undefined,
    },

    predictableActionArguments: true,
  },
  {
    actions: {
      setContext: assign((context, { value }) => {
        return produce(context, (draft) => {
          draft.sourceSong = value.sourceSong;
          draft.currentMix = value.currentMix;
          draft.currentTracks = value.currentTracks;
        });
      }),
    },
  }
);
