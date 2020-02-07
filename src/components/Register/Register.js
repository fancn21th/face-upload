import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import "./Register.css";
import { SIGNUP_TASK } from "../../config/endpoints";

const codes = [
  "注册成功",
  "已经注册",
  "写入数据库有误",
  "服务器有误",
  "服务过期"
];

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        // console.log("Received values of form: ", values);
        let response = await fetch(SIGNUP_TASK, {
          method: "POST",
          body: formData
        });

        /*
          返回状态码说明	
          0 注册成功
          1 已经注册
          2 写入数据库有误
          3 服务器有误
          4 服务过期
        */
        const { code } = await response.json();
        const resMsg = codes[code];
        if (code === "0") {
          message.success(resMsg);
        } else {
          message.error(resMsg);
        }
      }
    });
  };

  render() {
    const { name } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入用户名" }],
            initialValue: name
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "register" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
