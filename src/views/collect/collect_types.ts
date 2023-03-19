export interface CollectItem {
  id: number;
  userId: number;
  news: {
    id: string;
    title: string;
    image: string
  }
}

export interface CollectListPromise {
  code: number;
  codeText: string;
  data: CollectItem[]
}