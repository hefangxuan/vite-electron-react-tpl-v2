import React from 'react';
import { Button } from 'antd';
import { useElectron } from '/@/hooks/electron';
import Test from '../../../common/apis/test';
import PageHeader from '/@/components/PageHeader';
import List from '/@/components/List';
import Title from '/@/components/Title';
import { sleep } from '../../../common/utils';
// import {nestJSRequest} from '../../../common/apis/api-list'

const Index = () => {
  const getB = async () => {
    const { request, getMachineInfo, checkMachineInfoParams } = useElectron();
    const test = new Test({ request });
    await sleep(5000);
    const res = await test.getBaidu('http://www.baidu.com');
    console.log(2222, res, getMachineInfo(), checkMachineInfoParams());
  };

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <PageHeader title="Vite Demo">
        <div className="flex-1 flex flex-row">
          <div className="flex-1 border-r">left</div>
          <div className="flex-1 flex flex-col">
            <Title title="撒的" />
            <Button onClick={getB}>测试请求</Button>
            <div className="flex-1">
              <List dataSource={[]} />
            </div>
          </div>
        </div>
      </PageHeader>
    </div>
  );
};

export default Index;
