import { MutationTree } from "vuex";

const mutations: MutationTree<config.StateType> = {
  // 获取用户参数
  GetUserParam(state,x){
    state.userParam=x
  },

  // 登陆状态删除
  loginStateDelete(state) {
    state.Loginstate = false;
  },

  // 登陆状态激活
  loginStateActive(state) {
    state.Loginstate = true;
  },

  // 对话框打开
  talkingUserState(state, x) {
    state.talkingUsername = x.name;
    state.talkingUserId = x.id;
    state.talkListstate = true;
  },

  // 对话框关闭
  talkingUserStateClose(state) {
    state.talkingUsername = "";
    state.talkListstate = false;
  },

  // 添加一个新人
  addNextPerson(state, x) {
    state.nextpersonmeg = x;
  },

  // 正在接待的人数
  changeTalkListNumber(state, x) {
    state.talklistnumber = x;
  },

  setTalkNumberTop(state, x) {
    state.talknumbertop = x;
  },

  // 登陆房间人数，用来展示联系人列表
  ChangeChartLoginInfo(state, x) {
    state.chartroom_logininfo = x;
  },

  // 添加房间中的人数。
  PushChartPersonNumber(state, x) {
    state.chartroom_logininfo.push(x);
  },

  // 删除房间中的人
  DeleteChartRoomPerson(state, x) {
    state.chartroom_logininfo.splice(x, 1);
  },

  // 添加未读的信息提示
  AddMessageId(state, x) {
    state.stateMessage = x;
  },

  // 选择短语并关闭短语抽屉
  ChooseQuickReply(state, x) {
    state.quickReplycontent = x;
    state.quickReplystate = false;
  },
  // 打开短语抽屉
  DeleteQuickReply(state) {
    state.quickReplycontent = '';
  }
};

export default mutations;
