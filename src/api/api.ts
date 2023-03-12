import request from "./interface";

// types
import { GetNews, NewsData } from "@/views/home/home_types";
import { NewsDetail } from "@/views/detail/detail_types";
import { TestCode, LoginInfo, LoginForm } from "@/views/login/login_types";

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
  viewNew: (id: string | number): Promise<NewsDetail> => {
    return request({
      method: "GET",
      url: "/news_info",
      params: {
        id,
      },
    });
  },
};

/* 登录 */
const user = {
  // 获取验证码
  getCode: (phone: string): Promise<TestCode> => {
    return request({
      method: "POST",
      url: "/phone_code",
      data: `phone=${phone}`,
    });
  },
  // 登录
  login: (params: LoginForm): Promise<LoginInfo> => {
    return request({
      method: 'POST',
      url: '/login',
      params
    })
  }
}

// 导出
export { news, user };
