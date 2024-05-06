import { AttachmentBuilder, BufferResolvable } from 'discord.js'
import { Stream } from 'node:stream';

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
