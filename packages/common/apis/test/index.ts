class Test {
  // 请求函数
  request: any;
  constructor(options: any) {
    const { request } = options;
    this.request = request;
  }

  getBaidu(url: string) {
    return this.request(url, { method: 'get' });
  }
}

export default Test;
