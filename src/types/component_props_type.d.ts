import { NavigateFunction, Location, Params } from "react-router-dom";

import { InitialUser } from "@/store/reducer/modules/user";
import { LoginForm } from "@/views/login/login_types";
import { Dispatch } from "redux";

// 被统一赋予的路由页面组件所拥有的类型，被继承
interface ElementComponentPropsType {
  navigate: NavigateFunction;
  location: Location;
  params: Readonly<Params<string>>;
  searchQuery: URLSearchParams;
}
