import portrait from "@/assets/images/portrait.jpg" // 头像
import './TopHeader.less'

import { Avatar } from "antd-mobile"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { ToTextOfMonth, hourSlogan } from "@/assets/utils"

export default function TopHeader() {
  const navigate = useNavigate()
  const [time, setTime] = useState<string>(new Date().toLocaleDateString()) // 时间
  const timeText = useMemo(() => {
    // const timeArr = time.split('/')
    const month = ToTextOfMonth(new Date(time).getMonth())
    let day: number | string = new Date(time).getDate()
    if (day < 10) day = '0' + day
    return {
      month,
      day
    }
  }, [time])
  // 跳转
  const jump = (path: string = '/personal') => {
    navigate(path)
  }
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
          <Avatar src={portrait} style={{ "--size": "100%", '--border-radius': '50%' }} />
        </div>
      </div>
    </header>
  );
}
