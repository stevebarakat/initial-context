import { v4 } from "uuid";

declare global {
  type SourceSong = {
    id: string;
    slug: string;
    title: string;
    artist: string;
  };

  type SourceTrack = {
    id: string;
    name: string;
    path: string;
  };

  type MixSettings = {
    id: string;
    songSlug: string;
    volume: number;
    coverArt: number;
    mixName: string;
  };

  type TrackSettings = {
    id: string;
    name: string;
    path: string;
    songSlug: string;
    volume: number;
    mixSettingsId: string;
  };

  type InitialContext = {
    sourceSong: SourceSong | undefined;
    currentMix: MixSettings;
    currentTracks: TrackSettings[] | undefined;
  };
}
