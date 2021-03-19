import React from 'react';
import { useTitle } from 'ahooks';
import { useElectron } from '/@/hooks/electron';

const Layout = React.memo((props: any) => {
  const { appName, version } = useElectron();
  useTitle(`${appName} V${version}`);
  return <div className="base-h">{props.children}</div>;
});

export default Layout;
