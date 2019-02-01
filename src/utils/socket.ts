import store from "@/store/store";

export class socket {
  socket = new WebSocket("ws://appnode.biergao.vip:7272");

  SocketOpen(data: string) {
    this.socket.addEventListener("open", event => {
      console.log(`正在登陆`);
      this.SocketSend(data);
    });
  }
  SocketSend(data: string) {
    console.log(data);
    this.socket.send(data);
  }
  ListenMessage() {
    this.socket.addEventListener("message", event => {
      let data = JSON.parse(event.data);
      console.log(data);
      if (data.type == "init" && data.client_list) {
        console.log(`这里是login全部成员`);
        store.commit("ChangeChartLoginInfo", data.client_list);
      } else if (data.type == "logout") {
        console.log(`这里是loginout`);
        this.LoginOutComputed(data.uid);
      } else if (data.type == "init" && !data.client_list) {
        console.log(`这里是成员login`);
        store.commit("PushChartPersonNumber", data);
      } else if (data.type == "chatmessage") {
        console.log(`这里是收到说话`);
        store.commit("AddMessageId", data);
      } else if (data.type == "ping") {
        let type = `{"type":"pong"}`;
        this.SocketSend(type);
        this.ChangeTimer();
      }
    });
  }
  ChangeTimer() {
    let timer = setInterval(() => {
      console.log(`重新登陆`);
      this.LoginAgain();
    }, 1000 * 30);
    clearInterval(timer);
    timer = setInterval(() => {
      console.log(`重新登陆`);
      this.LoginAgain();
    }, 1000 * 30);
  }
  LoginAgain() {
    let param = `{"type":"login","client_name":"NewPc","room_id":"5","uid":"199","kid":"20"}`;
    this.SocketOpen(param);
  }
  // 单人登出房间
  LoginOutComputed(param: number) {
    let list = [...store.state.chartroom_logininfo];
    let index = null;
    for (let i in list) {
      if (list[i].uid == param) {
        index = i;
      }
    }
    store.commit("DeleteChartRoomPerson", index);
  }
  CloseSocket() {
    this.socket.close();
    console.log(`关闭了socket`);
  }
}
