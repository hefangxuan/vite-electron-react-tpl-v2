interface ElectronApi {
  readonly versions: Record<string, string>;
  request;
  appName: string;
  appId: string;
  version: string;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
}
