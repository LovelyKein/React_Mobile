import { NavigateFunction, Location, Params } from "react-router-dom";

import { InitialUser } from "@/store/reducer/modules/user";
import { UserActions } from "@/store/action/modules/user";

// 被统一赋予的路由页面组件所拥有的类型，被继承
interface ElementComponentPropsType {
  navigate: NavigateFunction;
  location: Location;
  params: Readonly<Params<string>>;
  searchQuery: URLSearchParams;
}

// 被 redux 用 connect 包裹的路由组件的属性 props 类型
export interface HaveReducerElement extends ElementComponentPropsType, InitialUser {
}

export interface HaveActionsElement extends ElementComponentPropsType, UserActions {}

export interface HaveAllElement extends HaveReducerElement, HaveActionsElement {

}