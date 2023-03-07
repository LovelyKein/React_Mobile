export interface SwiperData {
  image_hue: string;
  title: string;
  url: string;
  hint: string;
  ga_prefix: string;
  image: string;
  type: number;
  id: number;
}

interface StoriesData {
  image_hue: string;
  title: string;
  url: string;
  hint: string;
  ga_prefix: string;
  images: string[];
  type: number;
  id: number;
}

export interface NewsData {
  date: string;
  stories: StoriesData[];
}

export interface GetNews {
  date: string;
  top_stories: SwiperData[];
  stories: StoriesData[];
}