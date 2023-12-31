import type { Song } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function getSongWithTracks(id: Song["id"]) {
  return db.song.findUnique({ where: { id }, include: { tracks: true } });
}
// prisma/seed.ts
export async function seed3() {
  const song = await db.song.create({
    data: {
      title: "Everlong",
      slug: "everlong",
      artist: "Foo Fighters",
      year: "1997",
      studio: "Grandmaster Recorders",
      location: "Hollywood, CA",
      bpm: 158,
      start: 0,
      end: 250,
    },
  });

  await db.track.create({
    data: {
      songId: song.id,
      name: "Kick",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/01.kick.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Snare",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/02.snare.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Room",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/03.room.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Bass",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/04.bass.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Guitar",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/05.gtr.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Vocals",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/06.vox.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Extras",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/07.extra.ogg",
    },
  });
  await db.track.create({
    data: {
      songId: song.id,
      name: "Crowd",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/everlong/08.crowd.ogg",
    },
  });
}
