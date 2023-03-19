// react
import './TopHeader.less'
import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import portrait from "@/assets/images/portrait.jpg" // 头像

// redux
import { connect } from 'react-redux'
import actions from '@/store/action'

// antd
import { Avatar } from "antd-mobile"

// types
import { reducerType } from '@/store/reducer'
import { UserInfo } from "@/views/login/login_types"

// utils
import { ToTextOfMonth, hourSlogan } from "@/assets/utils"

function TopHeader(props: {
  userInfo: UserInfo | null;
  requset_userInfo_async: () => Promise<ObjAction>;
}) {
  // props
  const { userInfo, requset_userInfo_async } = props;

  // hooks
  const navigate = useNavigate();

  // useState
  const [time, setTime] = useState<string>(new Date().toLocaleDateString()); // 时间

  // useMemo
  const timeText = useMemo(() => {
    const month = ToTextOfMonth(new Date(time).getMonth());
    let day: number | string = new Date(time).getDate();
    if (day < 10) day = "0" + day;
    return {
      month,
      day,
    };
  }, [time]);

  // useEffect
  useEffect(() => {
    const requestAsync = setTimeout(() => {
      // 如果没有用户信息，则发起请求获取
      if (!userInfo) {
        requset_userInfo_async();
      }
    }, 10);
    return () => {
      clearTimeout(requestAsync);
    };
  });

  /* methods */

  // 跳转
  const jump = (path: string = "/personal") => {
    navigate(path);
  };

  return (
    <header>
      <div className="left_part">
        <div className="time">
          <h3 className="day">{timeText.day}</h3>
          <p className="month">{timeText.month}</p>
        </div>
        <div className="slogan">{hourSlogan()}</div>
      </div>
      <div className="right_part">
        <div onClick={() => jump()} className="portrait">
          <Avatar
            src={userInfo?.pic ? userInfo.pic : portrait}
            style={{ "--size": "100%", "--border-radius": "50%" }}
          />
        </div>
      </div>
    </header>
  );
}

export default connect(
  (store: reducerType) => {
    return {
      userInfo: store.user.userInfo,
    };
  },
  {
    requset_userInfo_async: actions.userAction.requset_userInfo_async
  }
)(TopHeader);