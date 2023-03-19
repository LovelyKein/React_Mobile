import { user_action } from "@/store/action_name";

// redux
import { Dispatch } from "redux";

// api
import { user } from "@/api/api";

// types
import { LoginForm, UserInfo } from "@/views/login/login_types";
import { CollectItem } from "@/views/collect/collect_types";

export interface UserActions {
  request_login_async: (arg0: LoginForm) => (arg0: Dispatch) => void;
  request_login: (arg0: string) => ObjAction;
  requset_userInfo_async: () => Promise<ObjAction>;
  request_collectList_async: () => Promise<ObjAction>;
  request_logout: () => ObjAction
}

const userAction: UserActions = {
  // 登录（异步）thunk 风格
  request_login_async(formData) {
    return (dispatch) => {
      user.login(formData).then(
        (res) => {
          const { code, token } = res;
          if (code === 0) {
            dispatch({
              type: user_action.LOGIN,
              data: token,
            });
          } else {
            dispatch({
              type: user_action.LOGIN,
              data: "",
            });
          }
        },
        () => {
          dispatch({
            type: user_action.LOGIN,
            data: "",
          });
        }
      );
    };
  },
  // 登录
  request_login(token) {
    // thunk 风格
    return {
      type: user_action.LOGIN,
      data: token,
    };
  },
  // 获取用户信息(异步) promise 风格
  async requset_userInfo_async() {
    let info: UserInfo | null = null;
    try {
      const { code, data } = await user.getUserInfo();
      if (code === 0) {
        info = data;
      }
    } catch (_) {}
    return {
      type: user_action.GET_USER_INFO,
      data: info,
    };
  },
  // 获取 用户的新闻收藏列表（异步）promise 风格
  async request_collectList_async() {
    let info: CollectItem[] = [];
    try {
      const { code, data } = await user.getCollectList();
      if (code === 0) {
        info = data;
      }
    } catch (_) {}
    return {
      type: user_action.GET_COLLECT_LIST,
      data: info,
    };
  },
  // 退出登录
  request_logout() {
    return {
      type: user_action.LOGOUT
    }
  },
};

export default userAction