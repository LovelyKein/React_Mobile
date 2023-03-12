// react
import { useEffect, useState } from "react"
import './Detail.less'
import { flushSync } from "react-dom"

// components

// antd
import { SafeArea } from "antd-mobile"


// api
import { news } from "@/api/api"

// types
import { NewsDetail } from "./detail_types"
import { ElementComponentPropsType } from "@/types/component_props_type";

export default function Detail(props: ElementComponentPropsType) {
  /* methods */

  // 处理样式
  const disposeStyle = (css: string[]): HTMLLinkElement[] => {
    const linkArr = css.map((item) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = item
      document.head.appendChild(link)
      return link
    })
    return linkArr
  }
  // 处理图片和标题
  const disposeImageAndTitle = (image: string, title: string) => {
    // 图片
    const imgPlaceHolder = document.getElementsByClassName("img-place-holder")[0];
    if (!imgPlaceHolder) return
    imgPlaceHolder.innerHTML = ''
    const tempImg = new Image()
    tempImg.src = image

    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg)
    }
    tempImg.onerror = () => {
      const parent = imgPlaceHolder.parentNode
      parent?.parentNode?.removeChild(parent)
    };
    // 标题
    const headBox = document.getElementsByClassName("headline")[0]
    const pre = headBox.getElementsByClassName('title')
    if (pre) {
      for(let index = 0; index < pre.length; index ++) {
        headBox.removeChild(pre[index])
      }
    }
    const titleBox = document.createElement('h3')
    titleBox.setAttribute('class', 'title')
    titleBox.innerText = title
    headBox.appendChild(titleBox)
  };
  const [newInfo, setNewInfo] = useState<NewsDetail>()
  // 组件挂载
  useEffect(() => {
    let linkArr: HTMLLinkElement[] = []
    const waitAsync = setTimeout(() => {
      news.viewNew(props.params.id!).then((res) => {
        setNewInfo(() => {
          return {...res}
        }) // 设置新闻包含的信息
        linkArr = disposeStyle(res.css) // 处理样式
      }) 
    }, 50)
    return () => {
      // 避免组件的重复挂载导致发送多次请求
      clearTimeout(waitAsync)
      // 组件卸载时，去除样式表
      if (linkArr.length) {
        linkArr.forEach((item) => {
          item && document.head.removeChild(item)
        })
      }
    }
  }, [])

  // 监听
  useEffect(() => {
    disposeImageAndTitle(newInfo?.image!, newInfo?.title!)
  }, [newInfo])

  return (
    <div className="detail_container">
      {/* 内容 */}
      <div className="content_box" dangerouslySetInnerHTML={{
        __html: newInfo?.body!
      }} />
      {/* 标签栏 */}
      <div className="tabBar">
        <div onClick={() => props.navigate(-1)} className="left">
          <i className="iconfont icon-xiangzuo" />
        </div>
        <div className="right">
          <div className="icon_item">
            <i className="iconfont icon-pinglun1" />
            <span className="count">9</span>
          </div>
          <div className="icon_item">
            <i className="iconfont icon-dianzan1" />
            <span className="count">9</span>
          </div>
          <div className="icon_item">
            <i className="iconfont icon-shoucang2" />
          </div>
          <div className="icon_item">
            <i className="iconfont icon-refresh-1-copy" />
          </div>
        </div>
      </div>
      {/* 安全区 */}
      <SafeArea position="bottom" />
    </div>
  );
}
