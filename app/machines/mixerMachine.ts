import { createMachine, assign } from "xstate";
import { produce } from "immer";

export const initMachine = createMachine(
  {
    id: "init",
    initial: "idle",
    context: {
      sourceSong: undefined,
      currentMix: undefined,
      currentTracks: undefined,
    },
    states: {
      idle: {
        on: {
          SET_CONTEXT: {
            target: "selected",
            actions: "setContext",
          },
        },
      },
      selected: {
        on: {
          LOADING: {
            target: "loaded",
          },
        },
      },
      loaded: {
        invoke: {
          src: "mixerMachine",
          id: "invoke-6jjxx",
        },
      },
    },
    schema: { events: {} as { type: "SET_CONTEXT" } | { type: "LOADING" } },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      setContext: assign(
        (context, { sourceSong, currentMix, currentTracks }) => {
          return produce(context, (draft) => {
            draft.sourceSong = sourceSong;
            draft.currentMix = currentMix;
            draft.currentTracks = currentTracks;
          });
        }
      ),
    },
    services: {
      mixerMachine: createMachine({
        id: "mixer",
        initial: "stopped",
        states: {
          playing: {
            entry: "play",
            on: {
              PAUSE: { target: "stopped", actions: "pause" },
            },
          },
          stopped: {
            on: {
              PLAY: { target: "playing" },
            },
          },
        },
      }),
    },
    guards: {},
    delays: {},
  }
);
