import React from "react";
import { Tabs } from "antd";
import "./App.css";
import Uploader from "../Uploader/Uploader";
import Unregister from "../Unregister/Unregister";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const FACE_REGISTER = "人脸注册";
const FACE_CANCEL_REGISTER = "人脸注册";

function App() {
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={FACE_REGISTER} key="1">
        <Uploader />
      </TabPane>
      <TabPane tab={FACE_CANCEL_REGISTER} key="2">
        <Unregister />
      </TabPane>
    </Tabs>
  );
}

export default App;
