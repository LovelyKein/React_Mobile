// react
import { useEffect, useState, useMemo } from "react"
import './Detail.less'
// import { flushSync } from "react-dom"

// antd
import { SafeArea, Toast } from "antd-mobile"

// redux
import { connect } from "react-redux"
import actions from "@/store/action"

// api
import { news, user } from "@/api/api"

// types
import { NewsDetail } from "./detail_types"
import { HaveAllElement } from "@/types/component_props_type";
import { reducerType } from "@/store/reducer"

function Detail(props: HaveAllElement) {
  // props
  const { navigate, location, userInfo, params, collectList, requset_userInfo_async, request_collectList_async } = props;

  // useState
  const [newInfo, setNewInfo] = useState<NewsDetail>()

  // useMemo
  let isCollect = useMemo(() => {
    return collectList.some((item) => {
      return params.id === item.news.id
    })
  }, [collectList, params]) // 是否以收藏

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
    imgPlaceHolder.innerHTML = '' // 将之前的内容清除
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
  // 点击收藏按钮的回调
  const handleCollect = async () => {
    if (!userInfo) {
      Toast.show({
        icon: 'fail',
        content: '请先登录',
        duration: 1000,
        maskClickable: false,
        afterClose: () => {
          navigate({
            pathname: '/login',
            search: `?to=${location.pathname}`
          })
        }
      })
    } else {
      if (isCollect) {
        // 已收藏，点击取消收藏
        const target = collectList.find((item) => {
          return item.news.id === params.id;
        });
        if (target) {
          try {
            const { code } = await user.removeCollect(target.id);
            if (code === 0) {
              Toast.show({
                content: "取消收藏成功",
                maskClickable: false,
              });
            } else {
              Toast.show({
                icon: "fail",
                content: "操作失败",
                maskClickable: false,
              });
            }
          } catch (_) {}
        }
      } else {
        // 未收藏，点击收藏
        try {
          const {code} = await user.addCollect(params.id || "");
          if (code === 0) {
            Toast.show({
              content: "收藏成功",
              maskClickable: false,
            });
          } else {
            Toast.show({
              icon: "fail",
              content: "收藏失败",
              maskClickable: false,
            });
          }
        } catch (_) {}
      }
      // 操作完成，再次获取收藏列表
      request_collectList_async()
    }
  }

  // 组件挂载
  useEffect(() => {
    let linkArr: HTMLLinkElement[] = []
    const waitAsync = setTimeout(async () => {
      // 获取新闻详情
      news.viewNew(props.params.id!).then((res) => {
        setNewInfo(() => {
          return {...res}
        }) // 设置新闻包含的信息
        linkArr = disposeStyle(res.css) // 处理样式
      })
      // 判断是否有用户信息
      if (!userInfo) {
        const {data} = await requset_userInfo_async()
        if (data) {
          request_collectList_async()
        }
      }
      if (userInfo) {
        request_collectList_async()
      }
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
    if (newInfo) {
      disposeImageAndTitle(newInfo.image, newInfo.title);
    }
  }, [newInfo])

  return (
    <div className="detail_container">
      {/* 内容 */}
      <div className="content_box" dangerouslySetInnerHTML={{
        __html: newInfo?.body ? newInfo.body : ''
      }} />
      {/* 标签栏 */}
      <div className="tabBar">
        <div onClick={() => navigate(-1)} className="left">
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
          <div onClick={() => handleCollect()} className="icon_item">
            <i className={isCollect ? 'iconfont icon-shoucang1 collect' : 'iconfont icon-shoucang2'} />
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

export default connect((store: reducerType) => {
  return {
    userInfo: store.user.userInfo, // 用户信息
    collectList: store.user.collectList, // 收藏列表
  };
}, {
  requset_userInfo_async: actions.userAction.requset_userInfo_async,
  request_collectList_async: actions.userAction.request_collectList_async
})(Detail);
