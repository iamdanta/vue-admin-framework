/**
 * 自动注册所有的 components/ 下的全局组件
 * 注意：组件名就是文件夹的名称，文件夹内必须有一个 index.vue
 */
import Vue from 'vue';

import { importAll } from '@/utils/import-all';

const components = [];
const requireContext = require.context('./', true, /index\.vue$/);
importAll(requireContext, (item) => {
  components.push({
    name: item.split('/')[1],
    component: requireContext(item).default
  });
});

components.forEach((item) => Vue.component(item.name, item.component));
