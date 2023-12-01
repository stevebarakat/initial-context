import * as localforage from "localforage";

export const sourceSong = localforage.getItem("sourceSong");
export const currentMix = localforage.getItem("currentMix");
export const currentTracks = localforage.getItem("currentTracks");
