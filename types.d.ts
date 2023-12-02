import { v4 } from "uuid";

declare global {
  type SourceSong = {
    id: string;
    slug: string;
    title: string;
    artist: string;
    year: string;
    studio: string;
    location: string;
    bpm: number;
    start: number;
    end: number;
    tracks?: SourceTrack[];
  };

  type SourceTrack = {
    id: string;
    name: string;
    path: string;
  };

  type SoloMuteType = {
    solo: boolean;
    mute: boolean;
  };

  type TrackSettings = {
    id: string;
    name: string;
    path: string;
    songSlug: string;

    // MAIN
    volume: number;
    volumeMode: string;
    pan: number;
    panMode: string;
    soloMute: { solo: boolean; mute: boolean };
    soloMuteMode: string;

    // FX
    fxNames: string[];
    delaySettings: DelaySettings;
    reverbSettings: ReverbSettings;
    pitchShiftSettings: PitchShiftSettings;

    // PANELS
    panelPosition: { x: number; y: number };
    panelSize: { width: string; height: string };
    panelActive: boolean;
  };

  type DelaySettings = {
    playbackMode: string | undefined;
    bypassed: boolean | undefined;
    mix: number | undefined;
    delayTime: number | undefined;
    feedback: number | undefined;
  };

  type ReverbSettings = {
    playbackMode: string | undefined;
    bypassed: boolean | undefined;
    mix: number | undefined;
    preDelay: number | undefined;
    decay: number | undefined;
  };

  type PitchShiftSettings = {
    playbackMode: string | undefined;
    bypassed: boolean | undefined;
    mix: number | undefined;
    pitch: number | undefined;
  };
}
