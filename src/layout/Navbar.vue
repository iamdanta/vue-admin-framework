<template>
  <div class="navbar full-height">
    <div class="navbar-toggle text-center" @click="toggleCollapse()">
      <i
        class="navbar-toggle-icon el-icon-d-arrow-left"
        :class="{ active: isCollapse }"
      ></i>
    </div>
    <el-menu
      ref="elMenu"
      class="navbar-menu full-height scrollbar-default"
      :collapse="isCollapse"
      :router="true"
      :default-active="activePath"
      background-color="#fff"
      text-color="#999"
      active-text-color="#27B88D"
    >
      <span class="menu-wrap" v-for="menu in menus" :key="menu.path">
        <el-submenu v-if="menu.children" :index="menu.path">
          <template slot="title">
            <i
              class="navbar-menu-icon"
              :class="getIconClass(menu.meta.icon)"
            ></i>
            <span slot="title">{{ menu.meta.label }}</span>
          </template>
          <el-menu-item
            v-for="subMenu in menu.children"
            :key="subMenu.path"
            :index="subMenu.path"
          >
            <i
              class="navbar-menu-icon"
              :class="getIconClass(subMenu.meta.icon)"
            ></i>
            <span slot="title">{{ subMenu.meta.label }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menu.path">
          <i class="navbar-menu-icon" :class="getIconClass(menu.meta.icon)"></i>
          <span slot="title">{{ menu.meta.label }}</span>
        </el-menu-item>
      </span>
    </el-menu>
  </div>
</template>

<script>
import { subRoutes } from '@/router';

/**
 * 左侧导航组件
 */
export default {
  data() {
    // find menu
    const menus = (function recursive(arr) {
      const result = [];
      arr.forEach((item) => {
        if (!item.meta.isNotMenu) {
          result.push(item);
          const children = item.children;
          if (children && children.length) {
            item.children = recursive(children);
          }
        }
      });
      return result;
    })(subRoutes);

    return {
      isCollapse: false,
      menus // 依赖路由配置
    };
  },
  computed: {
    activePath() {
      return this.$route.meta.activePath || this.$route.path;
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getIconClass(iconName) {
      return `el-icon-${iconName}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/common-variables';

.navbar {
  position: relative;
  $toggleHeight: 40px;

  .navbar-toggle {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: $toggleHeight;
    line-height: $toggleHeight;
    font-size: 16px;
    padding: 0 22px;
    cursor: pointer;
    color: white;
    background: #27B88D;
    border-right: $border-base;
  }

  .navbar-toggle-icon {
    transition: transform 0.3s;

    &.active {
      transform: rotate(180deg);
    }
  }

  .navbar-menu {
    overflow: hidden auto;
    padding-top: $toggleHeight;

    &:not(.el-menu--collapse) {
      width: $aside-width;
    }

    // 收起时，隐藏导航标题
    &.el-menu--collapse .el-submenu__title > span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
  }

  // 收起时，隐藏小箭头
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}

.navbar-menu-icon {
  font-size: 16px;
  margin-left: 3px;
  margin-right: 8px;
}
</style>
