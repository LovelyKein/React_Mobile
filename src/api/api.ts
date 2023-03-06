import request from "./interface";

// types
import { GetNews } from "../views/home/home_types";

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
};

// 导出
export { news };
