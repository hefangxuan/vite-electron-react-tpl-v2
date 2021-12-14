import _request from 'request-promise';
import { isJSON } from '../utils';

// import got from 'got';

export type RequestProps = _request.RequestPromiseOptions;
/**
 * 本api配置文件的请求函数封装
 * @param url
 * @param options
 */
export async function request(url: string, options: RequestProps) {
  return await _request({
    url,
    json: true,
    rejectUnauthorized: false,
    transform: async (body: any) => {
      return isJSON(body) ? JSON.parse(body) : body;
    },
    method: 'get',
    headers: {
      'Content-type': 'application/json',
    },
    ...options,
  }).catch((e: any) => {
    console.log('请求遇到错误', e);
  });
}
