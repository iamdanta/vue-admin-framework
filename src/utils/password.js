// 检测密码是否符合要求   密码必须保函数字和字母
export const checkPwd = (value) => {
  const patt = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
  return patt.test(value);
};

// 密码强度验证
export const passwordSafe = (value) => {
  // 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
  // 3： 表示第四个级别 4：表示第五个级别
  let modes = 0;
  if (value.length < 6) {
    // 最初级别
    return modes;
  }
  if (/\d/.test(value)) {
    // 如果用户输入的密码 包含了数字
    modes++;
  }
  if (/[a-z]/.test(value)) {
    // 如果用户输入的密码 包含了小写的a到z
    modes++;
  }
  if (/[A-Z]/.test(value)) {
    // 如果用户输入的密码 包含了大写的A到Z
    modes++;
  }
  if (/\W/.test(value)) {
    // 如果是非数字 字母 下划线
    modes++;
  }
  switch (modes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    default:
      return 0;
  }
};
