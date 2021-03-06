import { contextBridge, ipcRenderer } from 'electron';
import { request, RequestProps } from '../../common/request';
import {
  getMachineInfo,
  checkMachineInfoParams,
  checkAuthorization,
  createOrUpdateMachineInfo,
} from '../../common/authorization';

const { appName, appId, version } = require('../../../package.json');

const apiKey = 'electron';
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  appName,
  appId,
  version,
  versions: process.versions as Record<string, string>,
  request: async (url: string, options: RequestProps) => await request(url, options),
  getMachineInfo,
  checkMachineInfoParams,
  checkAuthorization,
  createOrUpdateMachineInfo,
  openMain: () => {
    ipcRenderer.send('openMain');
  },
};

if (import.meta.env.MODE !== 'test') {
  /**
   * The "Main World" is the JavaScript context that your main renderer code runs in.
   * By default, the page you load in your renderer executes code in this world.
   *
   * @see https://www.electronjs.org/docs/api/context-bridge
   */
  contextBridge.exposeInMainWorld(apiKey, api);
} else {
  /**
   * Recursively Object.freeze() on objects and functions
   * @see https://github.com/substack/deep-freeze
   * @param obj Object on which to lock the attributes
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function deepFreeze(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((prop) => {
        const val = obj[prop];
        if ((typeof val === 'object' || typeof val === 'function') && !Object.isFrozen(val)) {
          deepFreeze(val);
        }
      });
    }

    return Object.freeze(obj);
  }

  deepFreeze(api);

  window[apiKey] = api;

  // Need for Spectron tests
  window.electronRequire = require;
}
