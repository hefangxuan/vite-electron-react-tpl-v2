import { isDevEnv } from '../../common/utils';

export const wzNestUrl = isDevEnv ? 'http://localhost:3003' : '';
