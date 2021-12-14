/**
 * electron 主文件
 */
import { app, ipcMain } from 'electron';
import { Main, Motion } from './window';
import { globalConfig } from '/@/common/store';
import { isDevEnv } from '/@/common/utils';
import installExtension from 'electron-devtools-installer';
import { checkAuthorization } from '/@/common/authorization';
import { Authorization } from '/@/window/authorization';

// 是否启用授权页面
const isRole = false;

// 锁定单实例
const gotTheLock = app.requestSingleInstanceLock();

/**
 *  如果为真,说明已经有一个实例在运行,将本实例退出
 *  多窗口管理应该是创建窗口程序,不应该是多实例
 */
if (!gotTheLock) {
  app.quit();
} else {
  /**
   * 初始化ipc应该在这里
   */
  function initIpc() {
    ipcMain.handle('globalConfig', (event, key) => {
      return globalConfig.get(key);
    });
  }

  /**
   * 应用初始化窗口 应该在这里
   */
  async function init() {
    initIpc();

    // 优先启动loading窗口
    const motionWin = new Motion();
    motionWin.open();

    const mainWin = new Main({ show: false });

    let authorizationWin: Authorization | null = null;

    const mainOpen = () => {
      mainWin.open();
      if (mainWin.win) {
        mainWin.win.webContents.on('did-finish-load', () => {
          mainWin.win && mainWin.win.show();
          authorizationWin?.close();
          motionWin.close();
        });
      }
    };

    const authorizationOpen = () => {
      authorizationWin = new Authorization({ show: false });
      authorizationWin?.open();
      if (authorizationWin?.win) {
        authorizationWin.win.webContents.on('did-finish-load', () => {
          motionWin.close();
          authorizationWin?.win && authorizationWin.win.show();
        });
      }
    };

    if (isRole) {
      // 验证是否已授权
      const res = await checkAuthorization();
      if (res?.data?.status !== 'normal') {
        // 打开授权页面
        authorizationOpen();
        // 监听页面授权回调,如果成功将执行打开主窗口关闭授权窗口
        ipcMain.once('openMain', () => {
          motionWin.open();
          authorizationWin?.close();
          mainOpen();
        });
      } else {
        mainOpen();
      }
    } else {
      mainOpen();
    }

    // const user: User = (userStore.get(USER_INFO) ?? {}) as User;

    // if (user.token) {
    //   mainOpen();
    // } else {
    //   loginOpen();
    // }
  }

  /**
   * app 加载完成
   */
  app.whenReady().then(() => {
    if (isDevEnv) {
      installExtension('fmkadmapgofadopljbjfkapdkoienihi')
        .then((r) => console.log('Added Extension: ', r))
        .catch((e) => console.log('An error occurred: ', e));
    }
    init().then();
  });
}
