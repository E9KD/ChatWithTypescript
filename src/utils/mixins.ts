import { socket } from "@/utils/socket";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Minix extends Vue {
  newsocket: any = new socket();
  ServerSendMessage(data: string) {
    this.newsocket.SocketSend(data);
  }
  LoginOut() {
    this.newsocket.CloseSocket();
  }
}
