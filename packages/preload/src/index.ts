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

contextBridge.exposeInMainWorld(apiKey, api);
