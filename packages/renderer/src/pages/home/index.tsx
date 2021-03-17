import React from 'react';
import { PageHeader } from '@hefx/cmp';

const Home = (props: any) => (
  <div className="vh-100 w-100 d-flex flex-column flex-between">
    <PageHeader title="Vite Demo">
      <div className="flex-1 d-flex flex-row flex-between">
        <div className="flex-1 border-right-d">我是home left</div>
        <div className="flex-1">right</div>
      </div>
    </PageHeader>
  </div>
);

export default Home;
