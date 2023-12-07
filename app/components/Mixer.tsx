import { MixerMachineContext } from "~/context/MixerMachineContext";

type Props = {
  initialContext: InitialContext;
};

function Mixer({ initialContext }: Props) {
  return (
    <MixerMachineContext.Provider>
      <pre>{JSON.stringify(initialContext, null, 4)}</pre>
    </MixerMachineContext.Provider>
  );
}

export default Mixer;
