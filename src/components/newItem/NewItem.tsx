// react
import { Link } from "react-router-dom"

// antd
import { Image } from "antd-mobile";
import './NewItem.less'

interface PropsTypes {
  imageUrl: string;
  title: string;
  hint?: string;
  id: string
}
export default function NewItem(props: PropsTypes) {
  return (
    <div className="new_item">
      <Link to={{ pathname: `/detail/${props.id}` }}>
        <div className="new_text">
          <h4 className="title">{props.title}</h4>
          <p className="hint">{props.hint}</p>
        </div>
        <div className="new_image">
          <Image src={props.imageUrl ? props.imageUrl : "/404"} />
        </div>
      </Link>
    </div>
  );
}