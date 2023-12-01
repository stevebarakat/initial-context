import { createMachine } from "xstate";

export const mixerMachine = createMachine({
  id: "mixer",
  // context: initialContext,

  predictableActionArguments: true,
});
