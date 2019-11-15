import Dashboard from '@/views/dashboard';

/**
 * 首页路由配置
 */
export default {
  path: '/home/dashboard',
  name: 'dashboard',
  component: Dashboard,
  meta: {
    label: '主界面',
    icon: 's-home'
  }
};
