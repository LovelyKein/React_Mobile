import { user_action } from "@/store/action_name";

// redux
import { Dispatch } from "redux";

// api
import { user } from "@/api/api";

// types
import { LoginForm, UserInfo } from "@/views/login/login_types";

const userAction = {
  // 登录（异步）thunk 风格
  request_login_async(formData: LoginForm) {
    return (dispatch: Dispatch) => {
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
  request_login(token: string): ObjAction {
    // thunk 风格
    return {
      type: user_action.LOGIN,
      data: token,
    };
  },
  // 获取用户信息(异步) promise 风格
  async requset_userInfo_async(): Promise<ObjAction> {
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
};

export default userAction