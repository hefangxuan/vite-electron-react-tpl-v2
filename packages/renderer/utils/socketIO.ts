// eslint-disable-next-line @typescript-eslint/no-unused-vars

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import io from 'socket.io-client/dist/socket.io.js';
// import io from 'socket.io-client';

export default class SocketIO {
  static instance: any = null;

  private readonly messageListeners: any[];

  private readonly connectStatusListeners: any[];

  public ws: any;

  constructor() {
    this.messageListeners = [];
    this.connectStatusListeners = [];
  }

  static getInstance() {
    if (!SocketIO.instance) {
      SocketIO.instance = new SocketIO();
    }
    return SocketIO.instance;
  }

  connect(query: any) {
    const host = 'TODO';
    console.log('SocketIO ', `正在连接-> ${host}`);
    this.ws = io(`${host}/weixin`, {
      query,
    });
    this.ws.on('connect', () => {
      console.log('SocketIO ', `连接成功-> connected`);
      this.connectStatusListeners.forEach((listener) => {
        listener('connect');
      });
    });

    this.ws.on('message', (data: any) => {
      this.messageListeners.forEach((listener) => {
        listener(data);
      });
    });

    this.ws.on('disconnect', (e: any) => {
      this.connectStatusListeners.forEach((listener) => {
        listener('close');
      });
      if (e === 'io server disconnect') {
        console.log('SocketIO ', '服务器断开连接');
        return;
      }
      console.log('SocketIO ', '连接断开！3s后自动重连');
    });

    this.ws.on('error', (err: any) => {
      console.log(err);
      this.connectStatusListeners.forEach((listener) => {
        listener('error');
      });
    });
  }

  end() {
    this.ws.close();
    SocketIO.instance = null;
  }

  sendMessage(msg: any) {
    this.ws.emit(JSON.stringify(msg));
  }

  addMessageListener(listener: (msg: any) => void) {
    this.messageListeners.push(listener);
  }

  removeMessageListener(listener: (msg: any) => void) {
    let i = this.messageListeners.length;
    // eslint-disable-next-line no-plusplus
    while (i--) {
      if (this.messageListeners[i] === listener) {
        this.messageListeners.splice(i, 1);
      }
    }
  }

  addConnectStatusListener(listener: (msg: any) => void) {
    this.connectStatusListeners.push(listener);
  }

  removeConnectStatusListener(listener: (msg: any) => void) {
    let i = this.connectStatusListeners.length;

    // eslint-disable-next-line no-plusplus
    while (i--) {
      if (this.connectStatusListeners[i] === listener) {
        this.connectStatusListeners.splice(i, 1);
      }
    }
  }
}

// export const wsSocketIO = new SocketIO()
