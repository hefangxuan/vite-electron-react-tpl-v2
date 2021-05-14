import { BrowserWindow } from 'electron';
import { options, WinSubscribe, EventCallback } from './utils';
import path from 'path';

export class Motion extends WinSubscribe {
  public static events: Record<string, Array<EventCallback>> = {};

  public win: BrowserWindow | null = null;

  constructor(private opts?: Electron.BrowserWindowConstructorOptions) {
    super(Motion.events);
  }

  open(): void {
    this.win = new BrowserWindow({
      ...options,
      frame: false,
      width: 470,
      height: 280,
      transparent: true,
      ...this.opts,
    });

    // 隐藏默认菜单
    this.win.setMenuBarVisibility(false);

    this.win.loadURL(`file://${path.join(__dirname, 'loading.html')}`).catch(console.log); // 这里使用 hash 模式，确保打包后正常加载
    // 窗口居中
    // this.win.center();
  }

  close(): void {
    if (!this.win) {
      return;
    }
    if (this.win.isClosable()) {
      this.win.close();
      this.win = null;
    }
  }
}
