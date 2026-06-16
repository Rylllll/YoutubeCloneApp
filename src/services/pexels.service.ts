import { pexelsClient } from "../lib/axios";
import { PAGE_SIZE, USE_MOCK_DATA } from "../lib/constants";
import { MOCK_VIDEOS, getMockVideoById, getMockVideosByChannel } from "../data/mock";
import type {
  Video,
  VideoPage,
  PexelsVideo,
  PexelsVideoListResponse,
  PexelsVideoFile,
} from "../types/video";
import type { Creator } from "../types/creator";

function buildSources(files: PexelsVideoFile[]) {
  return files
    .filter((f) => f.file_type === "video/mp4" && f.link)
    .map((f) => ({
      link: f.link,
      width: f.width ?? 0,
      height: f.height ?? 0,
      quality: (f.quality || "sd").toUpperCase(),
    }))
    .sort((a, b) => b.height * b.width - a.height * a.width);
}

function deriveTitle(video: PexelsVideo): string {
  const slug = video.url.split("/").filter(Boolean).at(-1) ?? "";
  const words = slug.replace(/-\d+$/, "").replace(/-/g, " ").trim();
  const titled = words.replace(/\b\w/g, (c) => c.toUpperCase());
  return titled || `Video by ${video.user.name}`;
}

function normalizeVideo(video: PexelsVideo): Video {
  const sources = buildSources(video.video_files);
  const best = sources[0];
  return {
    id: String(video.id),
    title: deriveTitle(video),
    thumbnail: video.image,
    previewUrl: best?.link,
    sources,
    channelId: String(video.user.id),
    channelTitle: video.user.name,
    duration: video.duration,
    width: best?.width ?? video.width,
    height: best?.height ?? video.height,
    quality: best?.quality,
    sourceUrl: video.url,
  };
}

function paginateMock(videos: Video[], pageToken?: string): VideoPage {
  const start = pageToken ? Number(pageToken) : 0;
  const slice = videos.slice(start, start + PAGE_SIZE);
  const next = start + PAGE_SIZE;
  return { videos: slice, nextPageToken: next < videos.length ? String(next) : undefined };
}

async function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function nextTokenFrom(data: PexelsVideoListResponse): string | undefined {
  return data.next_page ? String((data.page ?? 1) + 1) : undefined;
}

export const pexelsService = {
  async getFeed(category: string, pageToken?: string): Promise<VideoPage> {
    if (USE_MOCK_DATA) {
      const filtered =
        category === "popular" ? MOCK_VIDEOS : MOCK_VIDEOS.filter((v) => v.categoryHint === category);
      return delay(paginateMock(filtered.length ? filtered : MOCK_VIDEOS, pageToken));
    }
    const page = pageToken ? Number(pageToken) : 1;
    const endpoint = category === "popular" ? "/popular" : "/search";
    const { data } = await pexelsClient.get<PexelsVideoListResponse>(endpoint, {
      params: { per_page: PAGE_SIZE, page, query: category === "popular" ? undefined : category },
    });
    return { videos: data.videos.map(normalizeVideo), nextPageToken: nextTokenFrom(data) };
  },

  async searchVideos(query: string, pageToken?: string): Promise<VideoPage> {
    if (USE_MOCK_DATA) {
      const q = query.toLowerCase();
      const matches = MOCK_VIDEOS.filter(
        (v) => v.title.toLowerCase().includes(q) || v.channelTitle.toLowerCase().includes(q),
      );
      return delay(paginateMock(matches, pageToken));
    }
    const page = pageToken ? Number(pageToken) : 1;
    const { data } = await pexelsClient.get<PexelsVideoListResponse>("/search", {
      params: { query, per_page: PAGE_SIZE, page },
    });
    return { videos: data.videos.map(normalizeVideo), nextPageToken: nextTokenFrom(data) };
  },

  async getVideoById(id: string): Promise<Video | null> {
    if (USE_MOCK_DATA) return delay(getMockVideoById(id) ?? null);
    const { data } = await pexelsClient.get<PexelsVideo>(`/videos/${id}`);
    return data ? normalizeVideo(data) : null;
  },

  async getSuggestedVideos(excludeId: string): Promise<Video[]> {
    if (USE_MOCK_DATA) return delay(MOCK_VIDEOS.filter((v) => v.id !== excludeId).slice(0, 8));
    const { data } = await pexelsClient.get<PexelsVideoListResponse>("/popular", {
      params: { per_page: PAGE_SIZE },
    });
    return data.videos.map(normalizeVideo).filter((v) => v.id !== excludeId);
  },

  async getCreator(id: string): Promise<Creator | null> {
    const videos = await this.getCreatorVideos(id);
    const first = videos[0];
    if (!first) return null;
    return {
      id,
      name: first.channelTitle,
      bio: `Creator on Pexels. Browse ${videos.length}+ free stock videos by ${first.channelTitle}.`,
      avatar: first.thumbnail,
      banner: first.thumbnail,
      videoCount: videos.length,
      profileUrl: first.sourceUrl,
    };
  },

  async getCreatorVideos(id: string): Promise<Video[]> {
    if (USE_MOCK_DATA) return delay(getMockVideosByChannel(id));
    const { data } = await pexelsClient.get<PexelsVideoListResponse>("/popular", {
      params: { per_page: 80 },
    });
    return data.videos.map(normalizeVideo).filter((v) => v.channelId === id);
  },
};
