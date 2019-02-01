const api = {
  AppUrl:'http://appnode.biergao.vip/chatline/ces',
  LoginUrl: `https://open.weixin.qq.com/connect/qrconnect?appid=wxf2747a1889ef7f53&redirect_uri=${encodeURIComponent(
    "http://appnode.biergao.vip/chatline/ces"
  )}&response_type=code&scope=snsapi_login&state=${Math.round(
    Math.random() * 100000
  )}#wechat_redirect`,
  CodeUrl: `http://appnode.biergao.vip/api/sqrcodelogin/ces`
};
export default api;
