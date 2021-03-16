/**
 * 判断是否是json字符串
 * @param str
 */
export const isJSON = (str: string) => {
  try {
    const obj = JSON.parse(str)
    return !!(typeof obj === 'object' && obj)
  } catch (e) {
    return false
  }
}

/**
 * 延迟函数
 * @param ms
 */
export const sleep = (ms: number) => new Promise(resolve => {
  setTimeout(resolve, ms)
})

/**
 * Workaround for TypeScript bug
 * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const {MODE, VITE_DEV_SERVER_URL} = import.meta.env

export const isDevEnv = MODE === 'development'

