export interface PexelsUser {
  id: number;
  name: string;
  url: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: "hd" | "sd" | "hls" | string;
  file_type: string;
  width: number | null;
  height: number | null;
  link: string;
}

export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: PexelsUser;
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
}

export interface PexelsVideoListResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: PexelsVideo[];
  next_page?: string;
  prev_page?: string;
}

export interface VideoSource {
  link: string;
  width: number;
  height: number;
  quality: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  previewUrl?: string;
  sources?: VideoSource[];
  channelId: string;
  channelTitle: string;
  channelAvatar?: string;
  duration: number;
  width?: number;
  height?: number;
  quality?: string;
  sourceUrl?: string;
  categoryHint?: string;
}

export interface VideoPage {
  videos: Video[];
  nextPageToken?: string;
}
