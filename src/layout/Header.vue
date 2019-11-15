<template>
  <header class="header flex-center-align">
    <router-link class="logo flex-center" to="/">
      <h4 class="logo-text">
        测试功能
      </h4>
    </router-link>
    <span class="flex-spacer"></span>
    <!-- user box -->
    <el-dropdown @command="command">
      <div class="user-box flex-center">
        <i class="el-icon-user-solid"></i>
        <span class="user-name">{{ userName }}</span>
        <i class="user-box-arrow el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">
          退出登录
        </el-dropdown-item>
        <el-dropdown-item command="change-password">
          修改密码
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import { userAuth } from '@/utils/auth';

export default {
  data() {
    return {
      userName: ''
    };
  },
  methods: {
    command(type) {
      switch (type) {
        case 'logout':
          this.logout();
          break;
        case 'change-password':
          this.changePassword();
          break;
        default:
      }
    },
    logout() {
      userAuth.clear();
      this.$router.push('/login');
    },
    changePassword() {
      this.$router.push('/change-password');
    }
  },
  mounted() {
    const data = userAuth.getToken();
    if (data) {
      this.userName = data.userName;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/common-variables.scss';

.header {
  height: $header-height;
  margin-top: -$header-height;
  padding: 0 10px;
  background: #fff;
  color: #999;

  .logo-image {
    height: 60px;
    border-radius: 50%;
  }

  .logo-text {
    font-size: 18px;
    margin-left: 5px;
  }

  .logo-sub-text {
    font-size: 12px;
    color: #b0c2e8;
  }

  .user-box {
    padding: 4px 8px;
    user-select: none;
    color: white;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #dddddd;
  }

  .user-name,
  .user-box-arrow {
    margin-left: 8px;
  }
}
</style>
