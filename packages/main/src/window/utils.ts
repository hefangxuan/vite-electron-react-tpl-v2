import { join } from 'path'
import { BrowserWindow, ipcMain, app } from 'electron'
import { isDevEnv, VITE_DEV_SERVER_URL } from '/@/common/utils'

export function getLoadURL() {
  return (app.isPackaged
    ? `file://${join(__dirname, '../../renderer/dist/index.html')}` // vite 构建后的静态文件地址
    : VITE_DEV_SERVER_URL || ''
  ).toString() // vite 启动的服务器地址
}

/**
 * Workaround for TypeScript bug
 * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
 */
const env = import.meta.env

export const options: Electron.BrowserWindowConstructorOptions = {
  width: 1024,
  height: 768,
  webPreferences: {
    preload: join(__dirname, '../../preload/dist/index.cjs'),
    contextIsolation: env.MODE !== 'test',   // Spectron tests can't work with contextIsolation: true
    enableRemoteModule: env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
  },
  ...(app.isPackaged
    ? {
        // 生产配置
      }
    : {
        // 开发期配置
        // y: 0,
        // x: 0,
      }),
}

export type EventCallback = (win: BrowserWindow | null) => void;
/**
 * 给 BrowserWindow 提供订阅管理
 */
export class WinSubscribe {
  constructor(protected events: Record<string, Array<EventCallback>>) {}

  public subscribe(name: string, cb: EventCallback) {
    this.regHandle(name, cb) // 放在前面，配合 regHandle 中的判断
    if (!Array.isArray(this.events[name])) {
      this.events[name] = []
    }
    this.events[name].push(cb)
    return () => this.unsubscribe(name, cb)
  }

  protected unsubscribe(name: string, cb: EventCallback) {
    if (!Array.isArray(this.events[name])) {
      return
    }
    this.events[name] = this.events[name].filter((_) => _ !== cb)
  }

  // 注册到 ipcMain.handle 上面
  protected regHandle(name: string, cb: EventCallback) {
    // Error: Attempted to register a second handler for 'Login.LOGIN'
    // if (ipcMain.eventNames().includes(name)) { return } 用不了
    if (Array.isArray(this.events[name])) {
      return
    } // 借助事件池判断
    ipcMain.handle(name, async (event) => {
      if (!Array.isArray(this.events[name])) {
        return
      }
      this.events[name].forEach(() => {
        cb(null)
      })
    })
  }
}
