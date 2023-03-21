import request from "./interface";

// types
import { GetNews, NewsData } from "@/views/home/home_types";
import { NewsDetail } from "@/views/detail/detail_types";
import { TestCode, LoginInfo, LoginForm, UserInfoPromise } from "@/views/login/login_types";
import { CollectListPromise } from "@/views/collect/collect_types"
import { UploadPromise } from "@/views/update/update_types";

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

/* 用户 */
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
      method: "POST",
      url: "/login",
      data: `phone=${params.phone}&code=${params.code}`,
    });
  },
  // 获取用户信息
  getUserInfo: (): Promise<UserInfoPromise> => {
    return request({
      method: "GET",
      url: "/user_info",
      responseType: "json",
    });
  },
  // 收藏新闻
  addCollect: (newsId: string): Promise<TestCode> => {
    return request({
      method: "POST",
      url: "/store",
      data: `newsId=${newsId}`,
      responseType: "json",
    });
  },
  // 移除收藏
  removeCollect: (id: number): Promise<TestCode> => {
    return request({
      method: "GET",
      url: "/store_remove",
      params: {
        id,
      },
      responseType: "json",
    });
  },
  // 获取收藏新闻的列表
  getCollectList: (): Promise<CollectListPromise> => {
    return request({
      method: "GET",
      url: "/store_list",
      responseType: "json",
    });
  },
  // 图片上传
  upload: (file: File): Promise<UploadPromise> => {
    const formData = new FormData();
    formData.append("file", file);
    return request({
      method: "POST",
      url: "/upload",
      data: formData,
    });
  },
  // 修改个人信息
  updateUser: (username: string, pic: string): Promise<UserInfoPromise> => {
    return request({
      method: "POST",
      url: "/user_update",
      data: `username=${username}&pic=${pic}`
    });
  },
};

// 导出
export { news, user };
