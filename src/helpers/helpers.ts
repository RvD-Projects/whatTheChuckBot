import { AttachmentBuilder, BufferResolvable, ThreadChannelType } from 'discord.js'
import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Stream } from 'node:stream';
import { client } from '..';

export function escapeEntities(str: string) {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };
  return str.replace(/([&<>\"'])/g, (match) => htmlEntities[match]);
}

export function unescapeEntities(str: string) {
  const htmlEntities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
  };
  return str.replace(
    /&amp;|&lt;|&gt;|&quot;|&apos;/g,
    (match) => htmlEntities[match]
  );
}

export function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
  return true;
}

export function tryParseJson(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

/**
 * Transforme un string vers un tableau de string
 * @param inputString Le texte a diviser
 * @param lineLength Nombre de charactères maximum par sor
 * @returns
 */
export function textToLines(inputString: string, lineLength: number): string[] {
  const lines: string[] = [];
  for (let i = 0; i < inputString.length; i += lineLength) {
    lines.push(inputString.slice(i, i + lineLength));
  }
  return lines;
}

/**
 * Transforme un texte en attachable
 * @param {string} content 
 * @param {string} filename
 * @returns {BufferResolvable | Stream}
 */
export function textToAttachment(content: string, filename: string): BufferResolvable | Stream {
  const buffer = Buffer.from(content, 'utf-8');

  return new AttachmentBuilder(Buffer.from(buffer)).setName(filename).attachment;
}

export function toSafeJsonString(object: any) {
  return JSON.stringify(
    object,
    (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
    2
  );
}

export function getRndInteger(min: number, max: number): number {
  if (min === max) {
    return max;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

export async function getFiles(dir) {
  const subDirs = await readdir(dir);

  const files = [];
  for (let i = 0; i < subDirs.length; i++) {
    try {
      const subDir = subDirs[i];
      const res = resolve(dir, subDir);
      const stats = await stat(res);

      files.push(stats.isDirectory() ? await getFiles(res) : res);
    } catch (error) {
      continue;
    }
  }

  return await files.reduce((a, f) => a.concat(f), []);
}

export async function getDirectories(dir) {
  const subDirs = await readdir(dir);

  const dirs = [];
  for (let i = 0; i < subDirs.length; i++) {
    try {
      const subDir = subDirs[i];
      const res = resolve(dir, subDir);
      const stats = await stat(res);

      stats.isDirectory() && dirs.push(res);
    } catch (error) {
      continue;
    }
  }

  return dirs;
}

export async function importFile(filePath: string) {
  return (await import(filePath))?.default;
}

export async function findGuildChannel(name: string, type: "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_STAGE_VOICE" | "GUILD_STORE" | "GUILD_TEXT" | ThreadChannelType | "GUILD_VOICE") {
  return await client.channels.cache.find(c => c.type === type && c.name === name);
}