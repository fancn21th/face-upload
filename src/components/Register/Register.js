import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import "./Register.css";
import { REMOVE_TASK } from "../../config/endpoints";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        let response = await fetch(REMOVE_TASK, {
          method: "POST",
          body: values
        });

        let result = await response.json();
        message.success(result.code);
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
