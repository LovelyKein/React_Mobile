import request from "./interface";

// types
import { GetNews, NewsData } from "@/views/home/home_types";
import { NewsDetail } from "@/views/detail/detail_types";

/* 新闻 */
const news = {
  // 获取最新新闻
  getNews: (): Promise<GetNews> => {
    return request({
      method: "GET",
      url: "/news_latest",
      responseType: "json",
    });
  },
  // 获取日期前一天的新闻
  getPreNews: (time: string): Promise<NewsData> => {
    return request({
      method: "GET",
      url: "/news_before",
      params: {
        time,
      },
      responseType: "json",
    });
  },
  // 获取新闻的详情
  viewNew: (id: number): Promise<NewsDetail> => {
    return request({
      method: "GET",
      url: "/news_info",
      params: {
        id,
      },
    });
  },
};

// 导出
export { news };
