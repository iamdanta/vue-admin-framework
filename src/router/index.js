/**
 * 路由配置
 */
import Vue from 'vue';
import Router from 'vue-router';

// 主容器组件
import Layout from '../layout';

// 子页面组件
// import DashBoard from '@/views/dashboard';

// 主区子路由
import dashboardRoute from './modules/dashboard'; // 主界面

// 子模块的路由注册
export const subRoutes = [dashboardRoute];

// 路由集合
const routes = [
  {
    path: '/home',
    component: Layout,
    redirect: subRoutes[0].path,
    children: subRoutes
  },
  {
    path: '**',
    redirect: '/home'
  }
];

Vue.use(Router);

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
});
