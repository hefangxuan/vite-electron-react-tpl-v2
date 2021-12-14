import React, { useEffect } from 'react';
import { useTitle } from 'ahooks';
import { useElectron } from '/@/hooks/electron';
import { PartitionOutlined, ReadOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

const Layout = React.memo((props: any) => {
  const { appName, version } = useElectron();
  useTitle(`${appName} V${version}`);

  const { push } = useHistory();

  const changeKey = (key: string) => {
    console.log(key);
    push(key);
  };

  // 启动项目优先进入主页,可以修改成其他判断, 比如判断是否登录
  useEffect(() => {
    push('/');
  }, []);

  return (
    <div className="h-full flex flex-col border-t">
      <div></div>
      <div className="h-full flex-1 flex flex-row">
        <div className="h-full">
          <Tabs
            className="h-full"
            tabPosition="left"
            size="large"
            tabBarGutter={20}
            tabBarExtraContent={{ left: <div style={{ height: 25 }} /> }}
            onTabClick={changeKey}
          >
            <TabPane
              tab={
                <div className="w-full flex flex-col justify-center items-center space-y-1">
                  <PartitionOutlined style={{ fontSize: 24 }} />
                  <div>项目管理</div>
                </div>
              }
              key="/"
              style={{ padding: 0 }}
            />
            <TabPane
              tab={
                <div className="flex flex-col justify-center items-center space-y-1">
                  <ReadOutlined style={{ fontSize: 24 }} />
                  <div>同义词管理</div>
                </div>
              }
              key="/synonym"
              style={{ padding: 0 }}
            />
          </Tabs>
        </div>
        <div className="flex-1">{props.children}</div>
      </div>
    </div>
  );
});

export default Layout;
