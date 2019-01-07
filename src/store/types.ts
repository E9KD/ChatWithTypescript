export interface LoginInfo {
  messagecount?: number;
  personname?: string;
  img?: string;
  uid?: number;
}
export interface StateType {
  password: number;
  Loginurl: string;
  // 登陆状态
  Loginstate: boolean;
  Loginstatetimenow: string;
  // 当前对话的名字
  talkingUsername: string;
  // 当前对话的id
  talkingUserId: number;
  // 当前对话的状态
  talkListstate: boolean;
  nextpersonmeg: any;
  talklistnumber: number;
  talknumbertop: number;
  // 房间中的信息
  chartroom_logininfo: LoginInfo[];
  //获取消息的id
  stateMessage: any;
}
