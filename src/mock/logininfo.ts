/**
 * @description:
 * @param {img} 头像
 * @param {name} 名字
 * @param {messagecount} 未读信息
 * @param {time} 最后时间
 * @param {isOnline} 是否在线
 * @return:
 */
export let login_user_info = [
  {
    avatarUrl: require("@/assets/active.png"),
    client_name: "111",
    messagecount: 4,
    content: "asdasdasdasd",
    time: "今天 12:20",
    isOnline: false
  },
  {
    avatarUrl: require("@/assets/active.png"),
    client_name: "222",
    messagecount: 4,
    content: "asdasdasdasd",
    time: "今天 12:20",
    isOnline: true
  }
];

export let user_info_list = {
  name: "宋震",
  phone: 15168821031,
  sex: "男",
  age: 20,
  wxaccount: "s15168821031",
  avatarUrl: require("@/assets/active.png")
};
