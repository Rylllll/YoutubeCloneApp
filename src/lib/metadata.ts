function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed: string): () => number {
  let a = hashSeed(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

export function getMockViewCount(id: string): number {
  const rand = seededRandom(`views:${id}`);
  const min = 2.5;
  const max = 7.3;
  return Math.floor(10 ** (min + rand() * (max - min)));
}

export function getMockViews(id: string): string {
  const n = getMockViewCount(id);
  return `${compact.format(n)} ${n === 1 ? "view" : "views"}`;
}

export function getMockPublishedDate(id: string): string {
  const rand = seededRandom(`date:${id}`);
  const units: Array<[string, number]> = [
    ["hour", 24],
    ["day", 30],
    ["week", 4],
    ["month", 12],
    ["year", 5],
  ];
  const [unit, max] = units[Math.floor(rand() * units.length)];
  const value = 1 + Math.floor(rand() * (max - 1));
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

export function getMockSubscriberCount(id: string): number {
  const rand = seededRandom(`subs:${id}`);
  return Math.floor(10 ** (3 + rand() * 4.3));
}

export function getMockSubscribers(id: string): string {
  const n = getMockSubscriberCount(id);
  return `${compact.format(n)} ${n === 1 ? "subscriber" : "subscribers"}`;
}

export function getMockDuration(id: string): number {
  const rand = seededRandom(`dur:${id}`);
  return 15 + Math.floor(rand() * 600);
}
