import {StateType} from "@/store/types";

const state: StateType = {
  password: 0,
  Loginurl: "",
  // 登陆状态
  Loginstate: false,
  Loginstatetimenow: "",
  // 当前对话的名字
  talkingUsername: "",
  // 当前对话的id
  talkingUserId: 0,
  // 当前对话的状态
  talkListstate: false,
  nextpersonmeg: {},
  talklistnumber: 0,
  talknumbertop: 5,
  // 房间中的信息
  chartroom_logininfo: [],
  //获取消息的id
  stateMessage: []
};

export default state;
