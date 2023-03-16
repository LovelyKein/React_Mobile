// react
import { ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import './NavBar.less'

// types
interface PropsType {
  children?: string; // 标题文字内容
  style?: { // 行样式
    [key: string]: number | string;
  };
  hasLeftArrow?: boolean; // 是否有返回箭头
  leftText?: string; // 返回的文字
  righeContent?: ReactElement | null // 右侧的内容
}

export default function NavBar(props: PropsType = {
  children: '标题',
  hasLeftArrow: true,
  leftText: '',
  righeContent: null
}) {
  const navigate = useNavigate()
  const { children, style, leftText, righeContent } = props;

  /* methods */

  // 点击返回的回调
  const handleClick = () => {
    navigate(-1)
  }

  return (
    <div className="nav_box" style={style}>
      {/* 左侧 */}
      <div onClick={() => handleClick()} className="left_part">
        <i className="iconfont icon-icon4" />
        {
          leftText ? <p className="leftText">{leftText}</p> : null
        }
      </div>
      {/* 标题 */}
      <h3 className="center">{children}</h3>
      {/* 右侧 */}
      <div className="right_part">
        { righeContent ? righeContent : null }
      </div>
    </div>
  );
}
