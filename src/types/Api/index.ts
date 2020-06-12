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
  videos: Video[];
}

export interface Video {
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

export interface VideoThumbnail {
  quality: string;
  url: string;
  width: number;
  height: number;
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
