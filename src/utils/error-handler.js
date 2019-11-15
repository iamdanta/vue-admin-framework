import { Message } from 'element-ui';

let errorMessageInstance;

/**
 * 错误信息提示
 * @param {String} message
 */
export default function errorMessage(message) {
  errorMessageInstance && errorMessageInstance.close();

  // 打印出错误信息
  console.warn('Error ->', message);

  // 显示错误信息
  errorMessageInstance = Message({
    message: formatterMessage(message),
    type: 'error',
    duration: 10000,
    showClose: true,
    onClose() {
      errorMessageInstance = null;
    }
  });
}

/**
 * 格式化错误信息（限制 80 字）
 * @param {*} msg
 * @return {string}
 */
function formatterMessage(msg) {
  if (msg instanceof Object) {
    msg = JSON.stringify(msg);
  } else {
    msg = String(msg);
  }
  msg = msg.length > 80 ? msg.slice(0, 80) + '...' : msg;
  return msg;
}
