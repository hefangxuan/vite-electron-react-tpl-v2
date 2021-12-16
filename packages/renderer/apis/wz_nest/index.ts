import { RequestProps } from '../../../common/request';
import { isJSON } from '../../utils/common';
import { wzNestUrl } from '../api-list';

function request(url: string, options?: RequestProps) {
  return new Promise((resolve, reject) => {
    try {
      window.electron.request({
        url: wzNestUrl + url,
        json: true,
        rejectUnauthorized: false,
        transform: async (body: any) => {
          resolve(isJSON(body) ? JSON.parse(body) : body);
        },
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
        ...(options || {}),
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * 获取同义词模板列表
 */
export async function findSignList() {
  return request('/task/findSignList', {
    method: 'POST',
  });
}

interface CreateOrUpdateSignBody {
  id?: number;
  name: string;
  remarks?: string;
}
/**
 * 创建同义词模板
 */
export async function createOrUpdateSign(body: CreateOrUpdateSignBody) {
  return request('/task/createOrUpdateSign', {
    method: 'POST',
    body,
  });
}

interface FindSynonymListParam {
  ySignId: number;
  page?: number;
  pageSize?: number;
}
/**
 * 获取同义词列表
 */
export async function findSynonymList(body: FindSynonymListParam) {
  return request('/task/findSynonymList', {
    method: 'POST',
    body,
  });
}

interface CreateOrUpdateSynonymBody {
  id?: number;
  ySignId: number;
  text: string;
  remarks?: string;
}
/**
 * 创建同义词
 */
export async function createOrUpdateSynonym(body: CreateOrUpdateSynonymBody) {
  return request('/task/createOrUpdateSynonym', {
    method: 'POST',
    body,
  });
}

/**
 * 删除同义词
 */
export async function delSynonym(body: { id: number }) {
  return request('/task/delSynonym', {
    method: 'POST',
    body,
  });
}
