
interface ElectronApi {
  readonly versions: Record<string, string>
  request
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
}
