import { NavigateFunction, Location, Params } from "react-router-dom";

// 被统一赋予的路由页面组件所拥有的类型，被继承
interface ElementComponentPropsType {
  navigate: NavigateFunction;
  location: Location;
  params: Readonly<Params<string>>;
  searchQuery: URLSearchParams;
}
