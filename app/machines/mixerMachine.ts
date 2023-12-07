import { createMachine } from "xstate";

export const mixerMachine = createMachine(
  {
    id: "mixer",
    initial: "stopped",
    states: {
      stopped: {
        on: {
          PLAY: {
            target: "playing",
          },
        },
      },
      playing: {
        entry: {
          type: "play",
        },
        on: {
          PAUSE: {
            target: "stopped",
            actions: {
              type: "pause",
            },
          },
        },
      },
    },
    types: { events: {} as { type: "PAUSE" } | { type: "PLAY" } },
  },
  {
    actions: {
      play: ({ context, event }) => {},
      pause: ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  }
);
