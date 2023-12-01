import { createActorContext } from "@xstate/react";
import { mixerMachine } from "../machines/test";

export const MixerMachineContext = createActorContext(mixerMachine);
