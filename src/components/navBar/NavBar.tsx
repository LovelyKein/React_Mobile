// react
import { ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import './NavBar.less'

// types
interface PropsType {
  children?: string;
  style?: {
    [key: string]: number | string;
  };
  hasLeftArrow?: boolean;
  leftText?: string;
  righeContent?: ReactElement | null
}

export default function NavBar(props: PropsType = {
  children: '标题',
  hasLeftArrow: true,
  leftText: '',
  righeContent: null
}) {
  const navigate = useNavigate()
  const { children, style, leftText, righeContent } = props;
  return (
    <div className="nav_box" style={style}>
      {/* 左侧 */}
      <div onClick={() => navigate(-1)} className="left_part">
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
