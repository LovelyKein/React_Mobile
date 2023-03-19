import { lazy, Suspense, LazyExoticComponent, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

// store
import store from "@/store";
import { RouterInfo, allRouter } from "@/store/reducer/modules/user";
import actions from "@/store/action";

// types
import { ElementComponentPropsType } from "@/types/component_props_type"; // 路由组件的默认属性 props 类型
import { UserInfo } from "@/views/login/login_types";

type RouterComponent = LazyExoticComponent<
  (props: ElementComponentPropsType) => JSX.Element
>;

// 骨架屏
import Skeleton from "@/components/Skeleton";

// antd
import { Toast, Mask, DotLoading } from "antd-mobile";

// 路由导航选项
const routerNav: {
  [key: string]: RouterComponent;
} = {
  Home: lazy(() => import("@/views/home/Home")),
  Detail: lazy(() => import("@/views/detail/Detail")),
  Personal: lazy(() => import("@/views/personal/Personal")),
  Collect: lazy(() => import("@/views/collect/Collect")),
  Update: lazy(() => import("@/views/update/Update")),
  Login: lazy(() => import("@/views/login/Login")),
  ErrorPage: lazy(() => import("@/views/error/ErrorPage")),
};

// 统一处理参数的 路由页面 的包裹组件
const authRoute = (path: string): boolean => {
  const {
    user: { userInfo },
  } = store.getState(); // redux 中保存的用户信息
  const needList: string[] = ["personal", "collect", "update"]; // 需要用户信息的路由页面
  return !userInfo && needList.includes(path);
};
function Element(props: {
  component: RouterComponent;
  meta: { [key: string]: string };
}) {
  const { component: ElementComponent, meta } = props; // 解构要渲染的组件信息

  // 统一传递路由参数和方法，实现统一传参管理
  const obj = {
    navigate: useNavigate(), // 编程导航
    location: useLocation(), // 地址信息
    params: useParams(), // 路径参数
    searchQuery: useSearchParams()[0], // 查询字符串参数
  };

  const path = obj.location.pathname.split("/")[1];
  const isPermission = authRoute(path); // 是否需要获取用户信息鉴权

  useEffect(() => {
    const requeatAsync = setTimeout(() => {
      if (isPermission) {
        actions.userAction.requset_userInfo_async().then((userInfo_action) => {
          const userInfo = userInfo_action.data as UserInfo | null;
          if (!userInfo) {
            Toast.show({
              icon: "fail",
              content: "请先登录",
              maskClickable: false,
              duration: 1000,
              afterClose: () => {
                // 跳转到 登录页面
                obj.navigate(
                  {
                    pathname: "/login",
                    search: `?to=${obj.location.pathname}`,
                  },
                  { replace: true }
                );
              },
            });
          } else {
            store.dispatch(userInfo_action); // 获取到了用户信息，存储到 redux 中
            // 跳转到目标页面
            obj.navigate({
              pathname: `/${path}`,
            });
          }
        });
      } else {
        // 不需要登录信息鉴权
      }
    }, 10);
    return () => {
      clearTimeout(requeatAsync);
    };
  });

  // 设置页面标题
  const { title = "知乎日报-WebApp" } = meta;
  document.title = title;

  return (
    <>
      {isPermission ? (
        <Mask color="white" visible={true}>
          <div
            style={{
              fontSize: "16px",
              color: "#9fa3f0",
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "max-content",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* <span>数据加载中</span> */}
            <DotLoading color="currentColor" />
          </div>
        </Mask>
      ) : (
        <ElementComponent {...obj} />
      )}
    </>
  );
}

// 递归创建 Route 组件
function routerRecursion(routes: RouterInfo[]) {
  return (
    <>
      {routes.map((item) => {
        return (
          <Route
            key={item.name}
            path={item.path}
            element={
              <Element component={routerNav[item.component]} meta={item.meta} />
            }
          >
            {item.children && item.children.length
              ? routerRecursion(item.children)
              : null}
          </Route>
        );
      })}
    </>
  );
}

// 创建路由规则和视图
export function createRouterView() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Routes>{routerRecursion(allRouter)}</Routes>
    </Suspense>
  );
}
