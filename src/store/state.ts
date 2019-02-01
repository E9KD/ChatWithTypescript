

const state: config.StateType = {
  password: 0,
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
  talklistnumber: 10,
  talknumbertop: 5,
  // 房间中的信息
  chartroom_logininfo: [],
  //获取消息的id
  stateMessage: [],
  // 选择的短语内容
  quickReplycontent: "",
  // 短语抽屉状态
  quickReplystate: false,
  // 用户参数
  userParam:{}
};

export default state;
