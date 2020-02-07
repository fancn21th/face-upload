import React from "react";
import { Tabs } from "antd";
import "./App.css";
import Uploader from "../Uploader/Uploader";
import Register from "../Register/Register";
import Unregister from "../Unregister/Unregister";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const FACE_REGISTER = "人脸注册";
const FACE_CANCEL_REGISTER = "人脸注销";

class App extends React.Component {
  state = {
    name: null
  };

  nameChange = name => {
    this.setState({
      name
    });
  };

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab={FACE_REGISTER} key="1">
          <Uploader onNameChange={this.nameChange} />
          <Register name={this.state.name} />
        </TabPane>
        <TabPane tab={FACE_CANCEL_REGISTER} key="2">
          <Unregister />
        </TabPane>
      </Tabs>
    );
  }
}

export default App;
