const validate = {
  //测试
  cs: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      // const reg = /^[a-z0-9\.-]*$/;
      const reg = /^com.*/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('测试'));
      }
    }
  },
  // 验证自然数
  naturalNumber: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^(([0-9]*[1-9][0-9]*)|(0+))$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入自然数'));
      }
    }
  },
  // 微信号
  wechat: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的微信号码'));
      }
    }
  },
  // 英文
  english: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^.[A-Za-z]+$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入英文字符'));
      }
    }
  },
  // 座机
  telephone: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的座机号'));
      }
    }
  },
  // 银行卡号码
  bankCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[1-9]\d{9,19}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的银行卡号码'));
      }
    }
  },
  // 证件号码
  IDNumber: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[a-z0-9A-Z]{0,50}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的证件号码'));
      }
    }
  },
  // 身份证号码,包括15位和18位的
  IDCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }else{
        let Y, JYM, ereg;
        let idcard = value;
        let S, M;
        let idcardArray = [];
        idcardArray = idcard.split('');
        //地区检验
        //if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4];
        //身份号码位数及格式检验
        switch (idcard.length) {
          case 15:
            if (
              (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 ||
              ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 &&
                (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)
            ) {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            } else {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(idcard)) return callback();
            else return callback(new Error('请输入正确的身份证号码'));
          case 18:
            //18 位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (
              parseInt(idcard.substr(6, 4)) % 4 === 0 ||
              (parseInt(idcard.substr(6, 4)) % 100 === 0 &&
                parseInt(idcard.substr(6, 4)) % 4 === 0)
            ) {
              ereg = /^[1-9][0-9]{7}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            } else {
              ereg = /^[1-9][0-9]{7}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {
              //测试出生日期的合法性
              //计算校验位
              S =
                (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 +
                (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 +
                (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 +
                (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 +
                (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 +
                (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 +
                (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 +
                parseInt(idcardArray[7]) * 1 +
                parseInt(idcardArray[8]) * 6 +
                parseInt(idcardArray[9]) * 3;
              Y = S % 11;
              M = 'F';
              JYM = '10X98765432';
              M = JYM.substr(Y, 1); //判断校验位
              if (M === idcardArray[17]) return callback();
              //检测ID的校验位
              else return callback(new Error('请输入正确的身份证号码'));
            } else return callback(new Error('请输入正确的身份证号码'));
          case 10:
            //香港身份证
            ereg = /^[A-Z]\d{6}[(|（]\d[)|）]$/g;
            if (ereg.test(idcard)) {
              return callback();
            } else {
              return callback(new Error('请输入正确的身份证号码'));
            }
          default:
            return callback(new Error('请输入正确的身份证号码'));
        }
      }
    }
  },
  // 港澳身份证号
  gaIDCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的港澳身份证号码'));
      }
    }
  },
  // 台湾身份证号
  tIDCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的台湾身份证号码'));
      }
    }
  },
  // QQ号码
  qq: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[1-9]\d{4,11}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的QQ号码'));
      }
    }
  },
  // 网址, 仅支持http和https开头的
  url: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入以http和https开头的网址'));
      }
    }
  },
  // 0到20位的英文字符和数字
  enNum0to20: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[a-z0-9A-Z]{0,20}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入20位以内的英文字符和数字'));
      }
    }
  },
  // 2到100位的中英文字符和空格
  cnEnSpace2to100: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入2到100位的中英文字符和空格'));
      }
    }
  },
  // 数字和换行符
  numLinefeed: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[0-9\n*]+$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入数字和换行符'));
      }
    }
  },
  // 255位以内的字符
  char0to255: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^.{0,255}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入255位以内的字符'));
      }
    }
  },
  // 特殊字符
  specialChar: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[^`~!@#$^&*()=|{}':;',/\\[\].<>?]*$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请删除特殊字符'));
      }
    }
  },
  // 保留四位小数
  twoDecimal: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^(([0-9][0-9]*)|(([0]\.\d{1,4}|[0-9][0-9]*\.\d{1,4})))$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('小数点保留最多两位'));
      }
    }
  },
  // 用户名 第一个是字母,长度是4-20
  loginname: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[a-zA-Z]\w{3,19}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('字母开头，长度为4-20'));
      }
    }
  },
  // 密码  6-20位字母，数字和符号两种以上组合
  password: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*_,]+$)[a-zA-Z\d!@#$%^&*_,]+$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('6-20位字母，数字和符号两种以上组合'));
      }
    }
  },
  // 必填
  required: {
    required: true,
    message: '必填'
  },
  // 电话
  phone: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^((0\d{2,3}-\d{7,8})|((13[0-9])|(14[5,7,9])|(15[^4])|(16[5,6])|(18[0-9])|(19[1,8,9])|(17[0,1,3,5,6,7,8]))\d{8})$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('必须为合法电话'));
      }
    }
  },
  //邮政编码
  postalcode: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[0-9]{6}$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的邮政编码'));
      }
    }
  },
  //护照
  passPortCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^([a-zA-z]|[0-9]){5,17}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的护照号'));
      }
    }
  },
  //户口本
  accountCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的户口本号'));
      }
    }
  },
  //军士证
  officerCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的军士证号'));
      }
    }
  },
  //组织机构代码
  zzjgCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的组织机构代码'));
      }
    }
  },
  //营业执照编号
  yyzzCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的营业执照编号'));
      }
    }
  },
  //统一社会信用代码
  shxyCard: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的统一社会信用代码'));
      }
    }
  },
  // 汉字加字字母
  normalchar: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /([\u4e00-\u9fa5]|\w)+$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('只能为汉字数字字母'));
      }
    }
  },
  // email
  email: {
    type: 'email',
    message: '请输入正确的邮箱'
  },
  // 数值
  number: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^\d*(\.\d+)?$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('只能是数字'));
      }
    }
  },
  // 2位小数
  point2num: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入数字，最多保留2位小数'));
      }
    }
  },
  // 正整数
  zhengnumber: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback();
      }
      const reg = /^([1-9]\d*|[0]{1,1})$/g;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('只能是正整数'));
      }
    }
  },
  isExternal: (path) => {
    return /^(https?:|mailto:|tel:)/.test(path);
  }
};

export default validate;
