// react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.less";

// antd
import { Swiper, Image, Divider } from "antd-mobile";

// api
import { news } from "@/api/api";

// types
import { SwiperData, NewsData } from "./home_types";

/* components */
import TopHeader from "@/components/topHeader/TopHeader";
import NewItem from "@/components/newItem/NewItem";

export default function Home() {
  let [swiperList, setSwiperList] = useState<SwiperData[]>([]),
    [newsList, setNewsList] = useState<NewsData[]>([]);
  // 组件挂载 18特性，useEffect 挂载会执行两次
  useEffect(() => {
    const asyncRequest = async () => {
      try {
        // 获取新闻列表
        const res = await news.getNews()
        const { date, top_stories, stories } = res;
        if (top_stories.length) setSwiperList(top_stories);
        if (stories.length) {
          newsList.push({
            date,
            list: stories,
          });
          setNewsList([...newsList]) // 浅拷贝，避免数据引用导致视图不更新
        }
      } catch (error) {
        console.error(error)
      }
    }
    const waitDispose = setTimeout(asyncRequest, 10)
    return () => {
      // 在组件卸载时清除定时器
      clearTimeout(waitDispose)
      setNewsList([])
      setSwiperList([])
    }
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
        {
          newsList.map((current, index) => {
            const { date, list } = current
            return (
              <div className="news_oneday" key={date}>
                {index !== 0 ? <Divider contentPosition='left'>{date}</Divider> : ''}
                <div className="news_list">
                  {
                    list.map((item) => {
                      if (!Array.isArray(item.images)) item.images = ['']
                      return (
                        <NewItem key={item.id} id={item.id} imageUrl={item.images[0]} title={item.title} hint={item.hint} />
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
