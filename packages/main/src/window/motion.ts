import { BrowserWindow } from "electron";
import { options, getLoadURL, WinSubscribe, EventCallback } from "./utils";
import { join } from "path";
import path from "path";

export class Motion extends WinSubscribe {
  public static events: Record<string, Array<EventCallback>> = {};

  public win: BrowserWindow | null = null;

  public url = getLoadURL();

  constructor(private opts?: Electron.BrowserWindowConstructorOptions) {
    super(Motion.events);
  }

  public open() {
    this.win = new BrowserWindow({
      ...options,
      frame: false,
      width: 470,
      height: 280,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs.js"),
      },
      ...this.opts,
    });
    this.win
      .loadURL(`file://${path.join(__dirname, "loading.html")}`)
      .catch(console.log); // 这里使用 hash 模式，确保打包后正常加载
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
