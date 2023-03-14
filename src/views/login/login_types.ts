export interface TestCode {
  code: number;
  codeText: string;
}

export interface LoginInfo {
  code: number;
  codeText: string;
  token: string;
}

export interface LoginForm {
  phone: string;
  code: string;
}

export interface UserInfo {
  id: number;
  name: string;
  phone: string;
  pic: string;
}

export interface UserInfoPromise {
  code: number;
  codeText: string;
  data: UserInfo;
}
