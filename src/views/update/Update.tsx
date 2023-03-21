// react
import { ChangeEvent, useEffect, useState, useRef, LegacyRef } from "react";
import "./Update.less";

// components
import NavBar from "@/components/navBar/NavBar";

// redux
import { connect } from "react-redux";
import actions from "@/store/action";

// antd
import { Toast } from "antd-mobile";

// api
import { user } from "@/api/api";

// types
import { HaveAllElement } from "@/types/component_props_type";
import { reducerType } from "@/store/reducer";

function Update(props: HaveAllElement) {
  // props
  const { userInfo, requset_userInfo_async } = props;

  // useState
  let [username, setUsername] = useState<string>(
      userInfo?.name ? userInfo.name : ""
    ),
    [pic, setPic] = useState<string>(userInfo?.pic ? userInfo.pic : ""),
    [isEdit, setIsEdit] = useState<boolean>(false);

  // useRef
  const fileInput = useRef<HTMLInputElement>();

  /* methods */

  // 修改用户名称回调
  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // 点击名称修改的回调
  const clickName = () => {
    setIsEdit(true);
  };

  // 输入框失去焦点
  const blurName = () => {
    setIsEdit(false);
  };

  // 删除照片的回调
  const delPic = () => {
    setPic("");
  };

  // 选择图片的回调
  const choosePic = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = fileInput.current?.files;
    if (fileList) {
      user.upload(fileList[0]).then((res) => {
        const { code, pic } = res;
        if (code === 0) {
          Toast.show({
            content: "上传成功",
            maskClickable: false,
          });
          setPic(pic);
        } else {
          Toast.show({
            icon: "fail",
            content: "上传失败",
            maskClickable: false,
          });
          setPic(userInfo?.pic ? userInfo.pic : "");
        }
      });
    }
    // const fileReader = new FileReader()
    // fileReader.readAsDataURL(new Blob(fileList))
    // fileReader.onload = (e) => {
    //   setPic(e.target?.result as string)
    // }
  };

  // 点击提交的回调
  const submit = () => {
    user.updateUser(username, pic).then((res) => {
      const { code } = res;
      if (code === 0) {
        requset_userInfo_async().then(() => {
          Toast.show({
            content: '修改成功',
            maskClickable: false
          })
        })
      } else {
        Toast.show({
          icon: 'fail',
          content: "修改失败",
          maskClickable: false,
        });
        setUsername(userInfo?.name || '')
        setPic(userInfo?.pic || '')
      }
    });
  };

  return (
    <div className="update_container">
      {/* 导航栏 */}
      <NavBar style={{ backgroundColor: "#fafafa" }}>个人信息</NavBar>
      {/* 内容区域 */}
      <div className="content_box">
        <div className="list_box">
          <div className="item">
            <p>头像</p>
            <div className="img_box">
              {pic ? (
                <div className="pic_box">
                  <span onClick={() => delPic()} className="del">
                    <i className="iconfont icon-caidanzengjia" />
                  </span>
                  <img src={pic} alt="" />
                </div>
              ) : (
                <div className="file_box">
                  <i className="iconfont icon-caidanzengjia" />
                  <input
                    ref={fileInput as LegacyRef<HTMLInputElement>}
                    type="file"
                    accept="image/*"
                    aria-hidden="true"
                    className="file_input"
                    onChange={(event) => {
                      choosePic(event);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="item">
            <p>用户名称</p>
            <div className="username">
              <p onClick={() => clickName()} className="name">
                {username}
              </p>
              <input
                style={{ display: isEdit ? "block" : "none" }}
                className="input"
                type="text"
                value={username}
                onChange={(event) => {
                  changeInput(event);
                }}
                onBlur={() => blurName()}
              />
            </div>
          </div>
        </div>
        <button type="button" onClick={() => submit()} className="submit">
          提交修改
        </button>
      </div>
    </div>
  );
}

export default connect(
  (store: reducerType) => {
    return {
      userInfo: store.user.userInfo,
    };
  },
  {
    requset_userInfo_async: actions.userAction.requset_userInfo_async,
  }
)(Update);
