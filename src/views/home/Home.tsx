// react
import { useEffect, useState, useRef, LegacyRef } from "react";
import { Link } from "react-router-dom";
import "./Home.less";

/* components */
import TopHeader from "@/components/topHeader/TopHeader";
import NewItem from "@/components/newItem/NewItem";

// antd
import { Swiper, Image, Divider, DotLoading } from "antd-mobile";

// api
import { news as newsApi } from "@/api/api";

// types
import { SwiperData, NewsData } from "./home_types";

// utils
import { formatTime } from "@/assets/utils";


export default function Home() {
  // ref
  const loadingRef = useRef<HTMLDivElement>();
  // state
  let [swiperList, setSwiperList] = useState<SwiperData[]>([]),
    [newsList, setNewsList] = useState<NewsData[]>([]);
  // 组件挂载 18特性，useEffect 挂载会执行两次
  useEffect(() => {
    // 第一次初始化数据
    const asyncRequest = async () => {
      try {
        // 获取新闻列表
        const res = await newsApi.getNews();
        const { date, top_stories, stories } = res;
        if (top_stories.length) setSwiperList(top_stories);
        if (stories.length) {
          newsList.push({
            date,
            stories,
          });
          setNewsList([...newsList]); // 浅拷贝，避免数据引用导致视图不更新
        }
      } catch (error) {
        console.error(error);
      }
    };
    const waitDispose = setTimeout(asyncRequest, 50);

    // 监听触底事件（显示加载更多），则发送请求获取之前日期的数据
    let touchBottom: IntersectionObserver | null = new IntersectionObserver(
      async (elements) => {
        const { isIntersecting } = elements[0];
        if (isIntersecting && newsList.length) {
          try {
            const nowDate = newsList[newsList.length - 1].date;
            const dataList = await newsApi.getPreNews(nowDate);
            newsList.push(dataList);
            setNewsList([...newsList]);
          } catch (error) {
            console.error(error);
          }
        }
      }
    );
    if (loadingRef.current) touchBottom.observe(loadingRef.current);

    return () => {
      // 在组件卸载时清除定时器，避免组件重复挂载导致请求多次发送
      clearTimeout(waitDispose);
      setNewsList([]);
      setSwiperList([]);
      // 组件卸载时，取消监听监听器
      touchBottom?.disconnect();
    };
  }, []);
  return (
    <div className="home_container">
      <TopHeader />
      {/* 轮播图区域 */}
      <div className="swiper_box">
        {swiperList.length ? (
          <Swiper loop autoplay>
            {swiperList.map((item) => {
              return (
                <Swiper.Item key={item.id}>
                  <Link
                    className="swiper_link"
                    to={{ pathname: `/detail/${item.id}` }}
                  >
                    <div className="swiper_content">
                      <Image lazy src={item.image ? item.image : "/404"} />
                      <div className="swiper_text">
                        <h3 className="text_title">{item.title}</h3>
                        <p className="text_hint">{item.hint}</p>
                      </div>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      {/* 新闻列表 */}
      <div className="news_box">
        {newsList.map((current, index) => {
          const { date, stories } = current;
          return (
            <div className="news_oneday" key={date}>
              {index !== 0 ? (
                <Divider contentPosition="left">{formatTime(date, '{1}月{2}日')}</Divider>
              ) : (
                ""
              )}
              <div className="news_list">
                {stories.map((item) => {
                  if (!Array.isArray(item.images)) item.images = [""];
                  return (
                    <NewItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.images[0]}
                      title={item.title}
                      hint={item.hint}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* 数据加载中 */}
      <div
        style={{ display: newsList.length ? "block" : "none" }}
        className="loading"
        ref={loadingRef}
      >
        <span>数据加载中 </span>
        <DotLoading />
      </div>
    </div>
  );
}
