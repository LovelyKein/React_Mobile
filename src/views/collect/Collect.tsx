// react
import { useEffect } from "react";
import './Collect.less'

// components
import NavBar from "@/components/navBar/NavBar";
import NewItem from "@/components/newItem/NewItem";

// redus
import { connect } from "react-redux";
import actions from "@/store/action";

// types
import { HaveAllElement } from "@/types/component_props_type";
import { reducerType } from "@/store/reducer";

function Collect(props: HaveAllElement) {
  // props
  const { request_collectList_async, collectList } = props;

  // 组件挂载
  useEffect(() => {
    const requestAsync = setTimeout(() => {
      request_collectList_async();
    }, 10);
    return () => {
      clearTimeout(requestAsync);
    };
  }, []);

  return (
    <div className="collect_container">
      {/* 导航栏 */}
      <NavBar>我的收藏</NavBar>
      {/* 内容区域 */}
      <div className="collect_list">
        {collectList
          ? collectList.map((item) => {
              return (
                <NewItem
                  key={item.id}
                  imageUrl={item.news.image}
                  title={item.news.title}
                  id={item.news.id}
                />
              );
            })
          : ""}
      </div>
      <span className="foot">我也是有底线的</span>
    </div>
  );
}

export default connect(
  (store: reducerType) => {
    return {
      userInfo: store.user.userInfo,
      collectList: store.user.collectList,
    };
  },
  {
    request_collectList_async: actions.userAction.request_collectList_async,
  }
)(Collect);
