<template>
  <div class="layout full-height">
    <Header />
    <div class="flex full-height">
      <Navbar />
      <div class="flex-1 full-height main-body flex-column">
        <HistoryRecord class="flex-none" />
        <div class="main-view flex-1 scrollbar-default flex">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Navbar from './Navbar.vue';
import HistoryRecord from './HistoryRecord.vue';

export default {
  name: 'layout',
  components: {
    Header,
    Navbar,
    HistoryRecord
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/common-variables';

.layout {
  // 头部导航高度 = $header-height，padding-top 是让 layout-body 能够高度 100%
  padding-top: $header-height;
  background-color: #f9f9f9;

  .header {
    margin-top: -$header-height;
  }
}

.main-body {
  padding: 15px;
  overflow: hidden;
}

.main-view {
  border: $border-base;
  overflow: hidden;
  background-color: #fff;
}
</style>
