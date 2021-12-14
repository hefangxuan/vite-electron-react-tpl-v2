import Index from '/@/pages';
import Home from '/@/pages/home';

export interface RouterType {
  title?: string;
  name?: string;
  path: string;
  component: any;
}

export const routers: RouterType[] = [
  {
    path: '/',
    name: '首页',
    component: Index,
  },
  {
    name: 'Home',
    path: '/synonym',
    component: Home,
  },
];
