import { BrowserWindow, screen } from 'electron';
import { options, getLoadURL, WinSubscribe, EventCallback } from './utils';
import { isDevEnv } from '/@/common/utils';

export class Main extends WinSubscribe {
  public static events: Record<string, Array<EventCallback>> = {};

  public win: BrowserWindow | null = null;

  public url = getLoadURL();

  constructor(private opts?: Electron.BrowserWindowConstructorOptions) {
    super(Main.events);
  }

  public open() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    this.win = new BrowserWindow({
      ...options,
      width: width * 0.8,
      height: height * 0.8,
      minWidth: width * 0.8,
      minHeight: height * 0.8,
      autoHideMenuBar: false,
      // title: appName,
      backgroundColor: '#fff',
      title: 'hefangxuan',
      ...this.opts,
    });

    // 隐藏默认菜单
    this.win.setMenuBarVisibility(false);

    if (isDevEnv) {
      this.win.webContents.openDevTools();
    }
    this.win.loadURL(this.url).catch(console.log);
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
