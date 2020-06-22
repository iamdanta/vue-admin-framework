<template>
  <div>
    <h3>我是主界面</h3>
    <!--  测试表单-->
    <base-form :fieldList="fieldList" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldList: [
        { label: '账号', value: 'account', type: 'input', required: true },
        { label: '密码', value: 'password', type: 'password', required: true },
        { label: '昵称', value: 'name', type: 'input', required: true },
        { label: '性别', value: 'sex', type: 'select', list: 'sexList', required: true },
        { label: '头像', value: 'avatar', type: 'slot', className: 'el-form-block' },
        { label: '手机号码', value: 'phone', type: 'input' },
        { label: '微信', value: 'wechat', type: 'input' },
        { label: 'QQ', value: 'qq', type: 'input' },
        { label: '邮箱', value: 'email', type: 'input' },
        { label: '描述', value: 'desc', type: 'textarea', className: 'el-form-block' },
        { label: '状态', value: 'status', type: 'select', list: 'statusList', required: true }
      ]
    }
  }
};
</script>

<style lang="scss" scoped></style>
