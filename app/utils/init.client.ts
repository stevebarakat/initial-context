import localforage from "localforage";

const init = () => {
  let initialSourceSong: SourceSong | unknown;
  let initialCurrentMix: MixSettings | unknown;
  let initialCurrentTracks: TrackSettings[] | unknown;
  window.addEventListener("load", () => {
    localforage
      .getItem("sourceSong")
      .then(function (sourceSong) {
        console.log("sourceSong", sourceSong);
        return (initialSourceSong = sourceSong);
      })
      .catch(function (err) {
        console.log("err", err);
      });

    localforage
      .getItem("sourceSong")
      .then(function (currentMix) {
        console.log("currentMix", currentMix);
        return (initialCurrentMix = currentMix);
      })
      .catch(function (err) {
        console.log("err", err);
      });

    localforage
      .getItem("sourceSong")
      .then(function (currentTracks) {
        console.log("currentTracks", currentTracks);
        return (initialCurrentTracks = currentTracks);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  });
  console.log("initialCurrentMix", initialCurrentMix);
  return { initialSourceSong, initialCurrentMix, initialCurrentTracks };
};
export default init();
