/*
 * @Company: YunMian
 * @Author: Song
 * @Date: 2019-01-09 10:34:12
 * @LastEditTime: 2019-01-11 09:50:56
 */

declare namespace config {
  // 登陆用户信息
  export interface LoginInfo {
    messagecount?: number;
    client_name?: string;
    avatarUrl?: string;
    uid?: number;
    lasttime?: string;
    isOnline?: boolean;
    content?: string;
  }

  // 聊天展示数组接口
  export interface talklistTypes {
    code?: number;
    isimg?: boolean;
    img?: string;
    time?: string;
    day?: string;
    name?: string;
    p?: string;
  }

  // State
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

  // 客户信息
  export interface userinfoTypes {
    name?: string;
    phone?: number;
    sex?: string;
    age?: number;
    wxaccount?: string;
    avatarUrl?: string;
  }

  // 短语types
  export interface quickreplyTypes {
    content: string;
    id: number;
  }

  // 历史聊天lastchat列表的types
  export interface historytalklistTypes {
    avatarUrl?: string;
    client_name?: string;
    lastTalktime?: string;
    isOnline?: boolean;
  }
}
