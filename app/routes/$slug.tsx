import type { ActionFunction } from "@remix-run/node";
import { getInitialState } from "~/utils/initialState";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ params: { slug } }) => {
  if (!slug) return;
  const { currentMix } = await getInitialState(slug);

  return redirect(`/${slug}/${currentMix?.id}`);
};
