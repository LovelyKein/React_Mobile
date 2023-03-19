// react
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  LegacyRef,
} from "react";
import "./Login.less";

// components
import NavBar from "@/components/navBar/NavBar";

// antd
import { Toast } from "antd-mobile";

// api
import { user } from "@/api/api";

// redux
import { connect } from "react-redux";
import actions from "@/store/action";

// types
import { LoginForm } from "@/views/login/login_types";
import { HaveActionsElement } from "@/types/component_props_type";

// 校验规则
const rules = {
  phone: [
    {
      required: true,
      message: "电话号码为必填项",
      trigger: "blur",
    },
    {
      reg: /^(?:(?:\+|00)86)?1\d{10}$/,
      message: "请输入11位数字的电话号码",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "验证码为必填项",
      trigger: "blur",
    },
    {
      reg: /^\d{6}$/,
      message: "请输入6位验证码",
      trigger: "blur",
    },
  ],
};

function Login(props: HaveActionsElement) {
  // useState
  const [formData, setFormData] = useState<LoginForm>({ phone: "", code: "" }),
    [codeText, setCodeText] = useState<string>("获取验证码"),
    [isCounting, setIsCounting] = useState<boolean>(false);

  // useRef

  // props
  const { navigate, searchQuery, request_login, requset_userInfo_async } =
    props;

  /* methods */
  // 设置表单内容
  const changeForm = (
    key: "phone" | "code",
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newForm = { ...formData };
    newForm[key] = event.target.value;
    setFormData(newForm);
  };
  // 获取验证码
  let timer: NodeJS.Timer | null = null;
  let count: number = 29;
  const getCode = () => {
    if (isCounting) return;
    if (!formData.phone) {
      Toast.show({
        content: "清先输入手机号码",
        maskClickable: false,
      });
    } else {
      user.getCode(formData.phone).then(
        (res) => {
          const { code } = res;
          if (code === 0) {
            Toast.show({
              icon: "success",
              content: "发送成功",
              maskClickable: false,
              duration: 1000,
            });
            setIsCounting(true);
            if (!timer) {
              timer = setInterval(() => {
                count--;
                setCodeText(`${count}秒后获取`);
                if (count === 0 && timer) {
                  clearInterval(timer);
                  count = 0;
                  setIsCounting(false);
                  setCodeText("获取验证码");
                }
              }, 1000);
            }
          }
          setFormData({ ...formData, code: "" });
        },
        () => {
          Toast.show({
            icon: "fail",
            content: "发送失败",
            maskClickable: false,
          });
        }
      );
    }
  };
  // 提交表单
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 组织表单默认提交行为
    // 登录
    user.login(formData).then((res) => {
      const { code, token } = res;
      if (code === 0) {
        request_login(token); // redux 储存 token
        // 异步 redux 获取用户信息
        requset_userInfo_async().then(() => {
          Toast.show({
            content: "登录成功",
            maskClickable: false,
            duration: 1500,
            afterClose: () => {
              const path = searchQuery.get("to");
              if (path) {
                navigate({
                  pathname: `${path}`,
                });
              }
            },
          });
        });
      } else {
        Toast.show({
          icon: "fail",
          content: "登录失败",
          maskClickable: false,
          duration: 1500,
        });
        setFormData({ ...formData, code: "" });
      }
    });
  };
  // // 校验
  // const formCheck = (
  //   key: "phone" | "code"
  // ): { message: string; show: boolean } => {
  //   let message = "错误错误";
  //   let show = false;
  //   const ruleArr = rules[key];
  //   ruleArr.forEach((item) => {
  //     document.getElementsByName(key)[0].addEventListener(item.trigger, (event) => {
  //       console.log(event);
  //       // console.log(formRef)
  //     });
  //   });
  //   return {
  //     message,
  //     show,
  //   };
  // };

  // 组件挂载
  useEffect(() => {
    // 组件卸载
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
        count = 29;
      }
    };
  }, []);

  return (
    <div className="login_container">
      {/* 导航栏 */}
      <NavBar
        style={{
          backgroundColor: "#fafafa",
        }}
        // leftText='返回'
        righeContent={
          <div onClick={() => navigate("/")} className="right_content">
            <i className="iconfont icon-shouye" />
          </div>
        }
      >
        账户登录
      </NavBar>
      {/* 内容 */}
      <div className="login_content">
        <div className="logo">
          <img src="/vite.svg" alt="" />
        </div>
        {/* 登录表单 */}
        <div className="form_box">
          <form className="form" onSubmit={(event) => submit(event)} action="">
            <div className="form_item">
              <i className="iconfont icon-weidenglu" />
              <input
                className="phone"
                type="text"
                placeholder="请输入手机号码"
                name="phone"
                maxLength={11}
                onChange={(event) => changeForm("phone", event)}
                value={formData.phone}
              />
              {/* <span
                style={{ display: formCheck("phone").show ? "block" : "none" }}
                className="error"
              >
                {formCheck("phone").message}
              </span> */}
            </div>
            <div className="form_item">
              <i className="iconfont icon-yanzhengma" />
              <input
                className="code"
                type="text"
                placeholder="短信验证码"
                name="code"
                maxLength={6}
                onChange={(event) => changeForm("code", event)}
                value={formData.code}
              />
              <button
                type="button"
                onClick={() => getCode()}
                className="get_code"
              >
                {codeText}
              </button>
              {/* <span
                style={{ display: formCheck("code").show ? "block" : "none" }}
                className="error"
              >
                {formCheck("code").message}
              </span> */}
            </div>
            <button type="submit" className="submit">
              登录 / 注册
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {
  requset_userInfo_async: actions.userAction.requset_userInfo_async,
  request_login: actions.userAction.request_login,
})(Login);
