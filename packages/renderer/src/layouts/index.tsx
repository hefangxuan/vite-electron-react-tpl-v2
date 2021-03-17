import React from 'react';
import { routers } from '/@/config/router';
import { Link } from 'react-router-dom';

const Layout = React.memo((props: any) => {
  return (
    <div>
      <div style={{ width: '100%', height: 40 }}>
        {routers.map((route: any) => {
          return (
            <Link key={route.path} to={route.path}>
              {route.name}
            </Link>
          );
        })}
      </div>
      {props.children}
    </div>
  );
});

export default Layout;
