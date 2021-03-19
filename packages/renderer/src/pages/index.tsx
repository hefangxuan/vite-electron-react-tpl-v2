import React from 'react';
import { PageHeader } from '@hefx/cmp';
import { Button } from 'antd';
import { useElectron } from '/@/hooks/electron';
import Test from '../../../common/apis/test';
// import {nestJSRequest} from '../../../common/apis/api-list'

const Index = () => {
  const getB = async () => {
    const { request, getMachineInfo, checkMachineInfoParams } = useElectron();
    const test = new Test({ request });
    const res = await test.getBaidu('http://www.baidu.com');
    console.log(2222, res, getMachineInfo(), checkMachineInfoParams());
  };

  return (
    <div className="h-100 w-100 d-flex flex-column flex-between">
      <PageHeader title="Vite Demo">
        <div className="flex-1 d-flex flex-row flex-between">
          <div className="flex-1 border-right-d">left</div>
          <div className="flex-1">
            <Button onClick={getB}>测试请求</Button>
          </div>
        </div>
      </PageHeader>
    </div>
  );
};

export default Index;
