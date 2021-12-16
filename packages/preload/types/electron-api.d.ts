export {};

export interface ElectronApi {
  readonly versions: Record<string, string>;
  request: typeof import('request-promise');
  appName: string;
  appId: string;
  version: string;
  checkMachineInfoParams;
  getMachineInfo;
  checkAuthorization;
  createOrUpdateMachineInfo;
  openMain;
}

declare global {
  interface Window {
    electron: Readonly<ElectronApi>;
    electronRequire?: NodeRequire;
  }
}
