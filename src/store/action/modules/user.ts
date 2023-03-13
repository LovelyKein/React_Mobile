import { user_action } from "@/store/action_name";

// redux
import { Dispatch } from "redux";

// antd
import { Toast } from "antd-mobile";

// api
import { user } from "@/api/api";

// types
import { LoginForm } from "@/views/login/login_types";

const userAction = {
  // 登录
  request_login(formData: LoginForm) {
    // thunk 风格
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
              data: '',
            });
          }
        },
        () => {
          dispatch({
            type: user_action.LOGIN,
            data: '',
          });
        }
      );
    };
  },
};

export default userAction