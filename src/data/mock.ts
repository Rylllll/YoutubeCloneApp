import type { Video } from "../types/video";

const SAMPLE_MP4 = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
];

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&h=360&q=80`;

interface Seed {
  title: string;
  creatorId: string;
  creator: string;
  photo: string;
  duration: number;
  category: string;
}

const seeds: Seed[] = [
  { title: "Forest Light Through Trees", creatorId: "u-aria", creator: "Aria Films", photo: "1441974231531-c6227db76b6e", duration: 32, category: "nature" },
  { title: "Calm Ocean Waves at Sunset", creatorId: "u-marin", creator: "Marin Studio", photo: "1505144808419-1957a94ca61e", duration: 48, category: "ocean" },
  { title: "City Traffic Time Lapse", creatorId: "u-urban", creator: "Urban Lens", photo: "1449824913935-59a10b8d2000", duration: 21, category: "city" },
  { title: "Server Room Data Center", creatorId: "u-nova", creator: "Nova Tech", photo: "1558494949-ef010cbdcc31", duration: 64, category: "technology" },
  { title: "Wild Deer in the Meadow", creatorId: "u-aria", creator: "Aria Films", photo: "1484406566174-9da000fda645", duration: 27, category: "animals" },
  { title: "Fresh Pasta Being Made", creatorId: "u-savor", creator: "Savor House", photo: "1473093295043-cdd812d0e601", duration: 39, category: "food" },
  { title: "Mountain Road Aerial Drive", creatorId: "u-wander", creator: "Wander Co.", photo: "1469474968028-56623f02e42e", duration: 55, category: "travel" },
  { title: "Misty Forest Morning", creatorId: "u-aria", creator: "Aria Films", photo: "1426604966848-d7adac402bff", duration: 18, category: "nature" },
  { title: "Underwater Coral Reef", creatorId: "u-marin", creator: "Marin Studio", photo: "1582967788606-a171c1080cb0", duration: 71, category: "ocean" },
  { title: "Neon City at Night", creatorId: "u-urban", creator: "Urban Lens", photo: "1480714378408-67cf0d13bc1b", duration: 29, category: "city" },
  { title: "Circuit Board Macro Shot", creatorId: "u-nova", creator: "Nova Tech", photo: "1518770660439-4636190af475", duration: 42, category: "technology" },
  { title: "Hot Air Balloons at Dawn", creatorId: "u-wander", creator: "Wander Co.", photo: "1507608616759-54f48f0af0ee", duration: 36, category: "travel" },
  { title: "Birds Flying Over Lake", creatorId: "u-aria", creator: "Aria Films", photo: "1444464666168-49d633b86797", duration: 24, category: "animals" },
  { title: "Coffee Pour Slow Motion", creatorId: "u-savor", creator: "Savor House", photo: "1495474472287-4d71bcdd2085", duration: 33, category: "food" },
  { title: "Waterfall in Rainforest", creatorId: "u-marin", creator: "Marin Studio", photo: "1432405972618-c60b0225b8f9", duration: 58, category: "nature" },
  { title: "Skyline Drone Flyover", creatorId: "u-urban", creator: "Urban Lens", photo: "1496588152823-86ff7695e68f", duration: 47, category: "city" },
];

export const MOCK_VIDEOS: Video[] = seeds.map((seed, i) => ({
  id: `vid-${i + 1}`,
  title: seed.title,
  thumbnail: img(seed.photo),
  previewUrl: SAMPLE_MP4[i % SAMPLE_MP4.length],
  channelId: seed.creatorId,
  channelTitle: seed.creator,
  duration: seed.duration,
  width: 1920,
  height: 1080,
  quality: "HD",
  sourceUrl: "https://www.pexels.com/videos/",
  categoryHint: seed.category,
}));

export function getMockVideoById(id: string): Video | undefined {
  return MOCK_VIDEOS.find((v) => v.id === id);
}

export function getMockVideosByChannel(channelId: string): Video[] {
  return MOCK_VIDEOS.filter((v) => v.channelId === channelId);
}
