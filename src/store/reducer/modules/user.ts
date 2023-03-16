import { deepClone, storage } from "@/assets/utils";
import { user_action } from "@/store/action_name";

// types
import { UserInfo } from '@/views/login/login_types'

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
export interface InitialUser {
  // allRouter: RouterInfo[];
  token: string;
  userInfo: UserInfo | null;
}
const initial: InitialUser = {
  // allRouter,
  token: storage.get('Token') || '',
  userInfo: null
};

export default function userReducer(state = initial, action: ObjAction) {
  const { LOGIN, GET_USER_INFO } = user_action;

  const cloneState = deepClone(state) as InitialUser;

  switch (action.type) {
    // 登录
    case LOGIN: {
      // 长久储存 token，时间为 30 天
      storage.set('Token', action.data as string)
      cloneState.token = action.data as string
      break;
    }
    // 获取用户信息
    case GET_USER_INFO: {
      cloneState.userInfo = action.data as UserInfo | null
    }
    default: {
      break;
    }
  }
  return cloneState;
}
