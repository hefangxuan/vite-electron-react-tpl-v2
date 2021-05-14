import { BrowserWindow } from 'electron';
import { options, WinSubscribe, EventCallback } from './utils';
import path from 'path';

export class Authorization extends WinSubscribe {
  public static events: Record<string, Array<EventCallback>> = {};

  public win: BrowserWindow | null = null;

  constructor(private opts?: Electron.BrowserWindowConstructorOptions) {
    super(Authorization.events);
  }

  public open() {
    this.win = new BrowserWindow({
      ...options,
      // frame: false,
      width: 540, // 宽高和拼多多官方保持一致
      height: 390,
      resizable: false, // 不让缩放
      // transparent: true,
      ...this.opts,
    });

    // 隐藏默认菜单
    this.win.setMenuBarVisibility(false);

    this.win.loadURL(`file://${path.join(__dirname, 'authorization.html')}`).catch(console.log); // 这里使用 hash 模式，确保打包后正常加载
    // 窗口居中
    // this.win.center();
  }

  public close() {
    if (!this.win) {
      return;
    }
    if (this.win.isClosable()) {
      this.win.close();
      this.win = null;
    }
  }
}
