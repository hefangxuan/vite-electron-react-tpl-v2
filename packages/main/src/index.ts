/**
 * electron 主文件
 */
import { app, ipcMain } from 'electron';
import { Main, Motion } from './window';
import { globalConfig } from '/@/common/store';
import { isDevEnv } from '/@/common/utils';
import installExtension from 'electron-devtools-installer';
import { getMachineInfo } from '/@/common/machineInfo';

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
    globalConfig.set('a', 1);
    ipcMain.handle('globalConfig', (event, key) => {
      return globalConfig.get(key);
    });
  }

  /**
   * 应用初始化窗口 应该在这里
   */
  function init() {
    initIpc();

    console.log(11111, getMachineInfo());
    // 优先启动loading窗口
    const motionWin = new Motion();
    motionWin.open();

    const mainWin = new Main({ show: false });

    const mainOpen = () => {
      mainWin.open();
      if (mainWin.win) {
        mainWin.win.on('ready-to-show', () => {
          motionWin.close();
          mainWin.win && mainWin.win.show();
        });
      }
    };

    mainOpen();
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
    init();
  });
}
