import React, { Component, lazy, Suspense } from "react";
import {
  RouteObject,
  Navigate,
  NavigateFunction,
  Location,
  Params,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { RouterInfo, allRouter } from "@/store/reducer/modules/user";

// 路由导航选项
interface RouterNavOptions {
  [key: string]: React.LazyExoticComponent<() => JSX.Element>;
}

const routerNav: RouterNavOptions = {
  Home: lazy(() => import("@/views/home/Home")),
  Detail: lazy(() => import("@/views/detail/Detail")),
  Personal: lazy(() => import("@/views/personal/Personal")),
  Collect: lazy(() => import("@/views/collect/Collect")),
  Update: lazy(() => import("@/views/update/Update")),
  Login: lazy(() => import("@/views/login/Login")),
  ErrorPage: lazy(() => import("@/views/error/ErrorPage")),
};

interface ElementComponentPropsType {
  navigate: NavigateFunction;
  location: Location;
  params: Readonly<Params<string>>;
  searchQuery: URLSearchParams;
}
// 统一处理参数的包裹组件
function Element(props: {
  component: React.LazyExoticComponent<
    (props: ElementComponentPropsType) => JSX.Element
  >;
  meta: {[key: string]: string}
}) {
  const { component: ElementComponent, meta } = props;
  console.log(meta);

  // 设置页面标题
  const { title = '知乎日报-WebApp'} = meta
  document.title = title

  // 统一传递路由参数和方法，实现统一传参管理
  const obj = {
    navigate: useNavigate(),
    location: useLocation(),
    params: useParams(),
    searchQuery: useSearchParams()[0],
  };

  return <ElementComponent {...obj} />;
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
            { item.children && item.children.length ? routerRecursion(item.children) : '' }
          </Route>
        );
      })}
    </>
  );
}


export function createRouterView() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>{routerRecursion(allRouter)}</Routes>
    </Suspense>
  );
}