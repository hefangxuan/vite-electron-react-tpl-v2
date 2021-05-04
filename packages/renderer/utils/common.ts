/**
 * 判断是否是json字符串
 * @param str
 */
export function isJSON(str: string): boolean {
  try {
    const obj = JSON.parse(str);
    return !!(typeof obj === 'object' && obj);
  } catch (e) {
    return false;
  }
}

export function plusXing(str: string, frontLen: number, endLen: number): string {
  // const len = str.length - frontLen - endLen;
  let xing = '';
  for (let i = 0; i < 4; i += 1) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/**
 * 随机数
 * @param min
 * @param max
 */
export function getRandom(min: number, max: number): number {
  // eslint-disable-next-line radix,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Math.floor(parseInt(Math.random() * (max - min))) + min;
}

export function compare(p: string) {
  //这是比较函数
  return function (m: any, n: any) {
    const a = m[p];
    const b = n[p];
    return b - a; //升序
  };
}

// 格式化cookie
export function formCookie(cookies: any): string {
  if (typeof cookies === 'object') {
    let str = '';
    Object.keys(cookies).forEach((item: string, index: number) => {
      const cookieItem = cookies[item];
      str += `${item}=${cookieItem}${index < Object.keys(cookies).length - 1 ? ';' : ''}`;
    });
    return str;
  }
  return cookies;
}

//2.强制保留2位小数，如：2，会在2后面补上00.即2.00
export function toDecimal2(x: any, len = 2): string {
  if (x == 0) return x;
  let f = parseFloat(x);
  if (isNaN(f)) {
    return '0';
  }
  f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + len) {
    s += '0';
  }

  return s;
}

/**
 * 打乱数组顺序
 *
 */

export function shuffleSelf(array: any[], size?: number) {
  let index: number, length: number, lastIndex: number;
  index = -1;
  // eslint-disable-next-line prefer-const
  length = array.length;
  // eslint-disable-next-line prefer-const
  lastIndex = length - 1;

  size = size === undefined ? length : size;
  let value;
  while (++index < size) {
    // var rand = baseRandom(index, lastIndex),
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    value = array[rand];

    array[rand] = array[index];

    array[index] = value;
  }
  array.length = size;
  return array;
}
