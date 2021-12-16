import { contextBridge, ipcRenderer } from 'electron';
import _request from 'request-promise';
import {
  getMachineInfo,
  checkMachineInfoParams,
  checkAuthorization,
  createOrUpdateMachineInfo,
} from '../../common/authorization';
import { ElectronApi } from '../types/electron-api';

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
  request: _request,
  getMachineInfo,
  checkMachineInfoParams,
  checkAuthorization,
  createOrUpdateMachineInfo,
  openMain: () => {
    ipcRenderer.send('openMain');
  },
};

contextBridge.exposeInMainWorld(apiKey, api);
