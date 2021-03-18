interface ElectronApi {
  readonly versions: Record<string, string>;
  readonly request;
  appName: string;
  appId: string;
  version: string;
  checkMachineInfoParams;
  getMachineInfo;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
}
