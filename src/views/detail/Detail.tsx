// react
import { useEffect, useState } from "react"
import './Detail.less'

// components

// antd
import { SafeArea } from "antd-mobile"


// api
import { news } from "@/api/api"

// types
import { NewsDetail } from "./detail_types"
import { ElementComponentPropsType } from "@/types/component_props_type";

export default function Detail(props: ElementComponentPropsType) {
  // 组件挂载
  useEffect(() => {
    console.log(props.params)
  }, [])
  return (
    <div className="detail_container">
      <div className="content">xexex</div>
      {/* 标签栏 */}
      <div className="tabBar">
        <div className="left">
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
