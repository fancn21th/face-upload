import React from "react";
import { Upload, Icon, message } from "antd";
import "./Uploader.css";
import { ADD_TASK } from "../../config/endpoints";

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => {
//     console.log(reader.result);
//     callback(reader.result);
//   });
//   reader.readAsDataURL(img);
// }

function beforeUpload(file) {
  const isJpg = file.type === "image/jpeg";
  if (!isJpg) {
    message.error("请上传 JPG 格式的图片!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片大小小于 2MB!");
  }
  return isJpg && isLt2M;
}

const codes = ["成功", "没有检测到人脸", "人脸分辨率过小", "上传的图片有误"];

class Uploader extends React.Component {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.state === "error") {
      message.error("图片上传失败!");
      return;
    }
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const {
        response: { code, result }
      } = info.file;
      /*
        code:
        0 成功
        1 没有检测到人脸
        2 人脸分辨率过小
        3 上传的图片有误
      */
      const resMsg = codes[code];
      if (code === "0") {
        message.success(resMsg);
        this.setState({
          imageUrl: `data:image/jpeg;base64,${result}`,
          loading: false
        });
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, imageUrl =>
        //   this.setState({
        //     imageUrl,
        //     loading: false
        //   })
        // );
      } else message.error(resMsg);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">上传人脸图片</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={ADD_TASK}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default Uploader;
