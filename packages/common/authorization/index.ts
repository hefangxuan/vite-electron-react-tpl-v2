import os from 'os';
import { v5 } from 'uuid';
import md5 from 'md5';
import qs from 'qs';
import { isDevEnv, sleep } from '../utils';
import { request } from '../request';

const { default: getMac } = require('getmac');

const { appName, appId: softwareType } = require('../../../package.json');

export const nestJS = isDevEnv ? 'http://localhost:3002' : '';

export interface CreateOrUpdateMachineInfoParams {
  machineCode: string;
  platform: string;
  distro: string;
  release: string;
  hostname: string;
  serial: string;
  macInfo: string;
  arch: string;
  softwareName: string;
  softwareType: string;
  userName: string;
}

export const salt = '1241A3B1-B367-58A0-B8BF-E83A2913D6FA';

export function getMachineInfo(): CreateOrUpdateMachineInfoParams {
  const { platform, release, hostname, arch, userInfo } = os;

  const macInfo = getMac();

  const machineCode = v5(macInfo + softwareType, salt).toUpperCase();

  return {
    machineCode,
    platform: platform(),
    distro: '',
    release: release(),
    hostname: hostname(),
    serial: '',
    arch: arch(),
    softwareName: appName,
    softwareType,
    macInfo,
    userName: userInfo().username,
  };
}

export function checkMachineInfoParams() {
  const time = new Date().getTime() + 60000;
  const { machineCode } = getMachineInfo();

  // 参数
  const r = md5(machineCode + salt + String(time));

  return {
    sign: r,
    machineCode,
    timestamp: time,
  };
}

// 请求服务器获取是否授权
export const checkAuthorization = async () => {
  const p = qs.stringify({
    ...checkMachineInfoParams(),
  });
  return request(nestJS + `/ks-machine-info?${p}`, {
    method: 'get',
  });
};

/**
 * 创建或更新机器码信息
 * @param body
 */
export async function createOrUpdateMachineInfo() {
  const body = getMachineInfo();
  return request(nestJS + `/ks-machine-info`, {
    method: 'post',
    json: true,
    body,
  });
}
