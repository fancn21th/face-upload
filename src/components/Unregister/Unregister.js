import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import "./Unregister.css";
import { REMOVE_TASK } from "../../config/endpoints";

const codes = ["成功", "数据库操作有误", "服务器有误", "服务过期"];

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
        let response = await fetch(REMOVE_TASK, {
          method: "POST",
          body: formData
        });
        /*
          0 成功
          1 数据库操作有误
          2 服务器有误
          3 服务过期
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入用户名" }]
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
            注销
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "unregister" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
