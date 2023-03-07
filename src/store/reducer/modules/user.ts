import { deepClone } from "@/assets/utils";

export interface RouterInfo {
  path: string;
  name: string;
  component: string;
  meta: {
    [key: string]: string;
  };
  children?: RouterInfo[];
}

// 路由
export const allRouter = [
  {
    path: "/",
    name: "home",
    // component: withKeepAlive(Home, { cacheId: "home", scroll: true }),
    component: "Home",
    meta: {
      title: "首页-知乎日报",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: "Detail",
    meta: {
      title: "新闻详情-知乎日报",
    },
  },
  {
    path: "/personal",
    name: "personal",
    component: "Personal",
    meta: {
      title: "个人中心-知乎日报",
    },
  },
  {
    path: "/collect",
    name: "collect",
    component: "Collect",
    meta: {
      title: "我的收藏-知乎日报",
    },
  },
  {
    path: "/update",
    name: "update",
    component: "Update",
    meta: {
      title: "修改个人信息-知乎日报",
    },
  },
  {
    path: "/login",
    name: "login",
    component: "Login",
    meta: {
      title: "登录/注册-知乎日报",
    },
  },
  {
    path: "*",
    name: "404",
    component: "ErrorPage",
    meta: {
      title: "404-知乎日报",
    },
  },
];

// 初始状态
interface InitialState {
  allRouter: RouterInfo[]
}
const initial: InitialState = {
  allRouter
};

export default function userReducer(state = initial, action: ObjAction) {
  const cloneState = deepClone(state) as InitialState;

  switch (action.type) {
    default: {
      break;
    }
  }
  return cloneState;
}
