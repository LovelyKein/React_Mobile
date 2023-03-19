// redux
import { connect } from "react-redux";
import actions from "@/store/action";
import "./Personal.less";

// components
import NavBar from "@/components/navBar/NavBar";

// types
import { HaveAllElement } from "@/types/component_props_type";
import { reducerType } from "@/store/reducer";

function Personal(props: HaveAllElement) {
  // props
  const { userInfo, request_logout, navigate, location } = props;

  /* methods */
  const handleLogOut = () => {
    request_logout();
    navigate(
      {
        pathname: "/login",
        search: `?to=${location.pathname}`,
      },
      {
        replace: true,
      }
    );
  };

  const handleJump = (path: string) => {
    navigate({
      pathname: path,
    });
  };

  return (
    <div className="personal_container">
      {/* 导航 */}
      <NavBar
        style={{
          backgroundColor: "#fafafa",
        }}
      >
        个人中心
      </NavBar>
      {/* 内容 */}
      <div className="personal_info">
        <div className="portrait">
          <img src={userInfo?.pic} alt="" />
        </div>
        <h3>{userInfo?.name}</h3>
      </div>
      <div className="list_box">
        <div onClick={() => handleJump("/collect")} className="item">
          <div className="left">
            <i className="iconfont icon-shoucang2" />
            <p>我的收藏</p>
          </div>
          <div className="right">
            <i className="iconfont icon-xiangzuo-copy" />
          </div>
        </div>
        <div className="item">
          <div className="left">
            <i className="iconfont icon-pinglun1" />
            <p>消息中心</p>
          </div>
          <div className="right">
            <i className="iconfont icon-xiangzuo-copy" />
          </div>
        </div>
      </div>
      <button onClick={() => handleLogOut()} type="button" className="logOut">
        退出登录
      </button>
    </div>
  );
}

export default connect(
  (store: reducerType) => {
    return {
      userInfo: store.user.userInfo,
    };
  },
  {
    request_logout: actions.userAction.request_logout,
  }
)(Personal);
