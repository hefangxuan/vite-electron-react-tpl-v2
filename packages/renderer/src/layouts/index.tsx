import React from 'react';
import { useTitle } from 'ahooks';
import { useElectron } from '/@/hooks/electron';

const Layout = React.memo((props: any) => {
  const { appName, version } = useElectron();
  useTitle(`${appName} V${version}`);
  return <div className="h-full flex flex-col border-t">{props.children}</div>;
});

export default Layout;
