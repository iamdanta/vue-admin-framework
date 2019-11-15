<template>
  <el-tabs
    class="history-record"
    v-model="activeName"
    type="card"
    :closable="tabs.length > 1"
    @tab-click="tabClick"
    @tab-remove="tabRemove"
  >
    <el-tab-pane
      :key="item.name"
      v-for="item in tabs"
      :label="item.label"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      tabs: [],
      activeName: ''
    };
  },
  methods: {
    addNav({ name, label }) {
      const tabs = this.tabs;
      let index = tabs.findIndex((item) => item.name === name);
      this.activeName = name;

      if (index === -1) {
        const nav = {
          name,
          label
        };

        tabs.push(nav);
      }
    },
    tabRemove(name) {
      const tabs = this.tabs;
      let index = tabs.findIndex((item) => item.name === name);
      const nav = tabs[index];

      tabs.splice(index, 1);

      if (this.$route.path === nav.name) {
        if (index >= tabs.length) {
          index--;
        }

        this.activeName = tabs[index].name;
        this.$router.push({ path: this.activeName });
      }
    },
    tabClick(ref) {
      this.$router.push({ path: ref.name });
    }
  },
  mounted() {
    const _this = this;
    const route = this.$route;

    this.$router.afterEach((to) => {
      _this.addNav({
        name: to.path,
        label: to.meta.label
      });
    });

    this.addNav({
      name: route.path,
      label: route.meta.label
    });
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/common-variables';
@import '~@/styles/mixins.scss';

.history-record {
  background-color: #fff;
}
</style>
