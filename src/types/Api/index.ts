export interface Playlist {
  type: 'invidiousPlaylist';
  title: string;
  playlistId: string;
  author: string;
  authorId: null;
  authorUrl: null;
  authorThumbnails: [];
  description: string;
  descriptionHtml: string;
  videoCount: number;
  viewCount: 0;
  updated: number;
  isListed: boolean;
  videos: VideoPlaylist[];
}

export interface VideoPlaylist {
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  authorUrl: string;
  videoThumbnails: VideoThumbnail[];
  index: number;
  indexId: string;
  lengthSeconds: number;
  // Custom types
  thumbnail: {
    quality: string;
    width: number;
    height: number;
    url: string;
  };
  uri: string;
}

export interface SearchVideo {
  type: 'video';
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  authorUrl: string;
  videoThumbnails: VideoThumbnail[];
  description: string;
  descriptionHtml: string;
  viewCount: number;
  published: number;
  publishedText: string;
  lengthSeconds: number;
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
}

export interface SearchPlaylist {
  type: 'playlist';
  title: string;
  playlistId: string;
  author: string;
  authorId: string;
  authorUrl: string;
  videoCount: number;
  videos: [
    {
      title: string;
      videoId: string;
      lengthSeconds: number;
      videoThumbnails: VideoThumbnail[];
    }
  ];
}

export interface SearchChannel {
  type: 'channel';
  author: string;
  authorId: string;
  authorUrl: string;
  videoThumbnails: VideoThumbnail[];
  subCount: number;
  videoCount: number;
  description: string;
  descriptionHtml: string;
}

export interface Video {
  indexId: string;
  title: string;
  videoId: string;
  videoThumbnails: VideoThumbnail[];
  description: string;
  descriptionHtml: string;
  published: number;
  publishedText: string;
  keywords: string[];
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  paid: boolean;
  premium: boolean;
  isFamilyFriendly: boolean;
  allowedRegions: string[];
  genre: string;
  genreUrl: string;
  author: string;
  authorId: string;
  authorUrl: string;
  authorThumbnails: [
    {
      url: string;
      width: number;
      height: number;
    }
  ];
  subCountText: string;
  lengthSeconds: number;
  allowRatings: boolean;
  rating: number;
  isListed: boolean;
  liveNow: boolean;
  isUpcoming: boolean;
  premiereTimestamp?: number;
  hlsUrl?: string;
  adaptiveFormats: [
    {
      index: string;
      bitrate: string;
      init: string;
      url: string;
      itag: string;
      type: string;
      clen: string;
      lmt: string;
      projectionType: number;
      container: string;
      encoding: string;
      qualityLabel?: string;
      resolution?: string;
    }
  ];
  formatStreams: FormatStreams[];
  captions: Captions[];
  recommendedVideos: [
    {
      videoId: string;
      title: string;
      videoThumbnails: VideoThumbnail[];
      author: string;
      lengthSeconds: number;
      viewCountText: string;
    }
  ];
}

export interface VideoThumbnail {
  quality: string;
  url: string;
  width: number;
  height: number;
}

export interface FormatStreams {
  url: string;
  itag: string;
  type: string;
  quality: string;
  container: string;
  encoding: string;
  qualityLabel: string;
  resolution: string;
  size: string;
}

interface Captions {
  label: string;
  languageCode: string;
  url: string;
}

export interface Instance {
  flag: null | string;
  region: string;
  stats: {
    version: string;
    software: {
      name: string;
      version: string;
      branch: string;
    };
    openRegistrations: boolean;
    usage: {
      users: {
        total: number;
        activeHalfyear: number;
        activeMonth: number;
      };
    };
    metadata: {
      updatedAt: number;
      lastChannelRefreshedAt: number;
    };
  };
  type: string;
  uri: string;
  monitor?: null | InstanceMonitor;
}

interface InstanceMonitor {
  monitorId: number;
  statusClass: string;
  weeklyRatio: {
    ratio: string;
    label: string;
  };
  name: string;
  type: string;
}
