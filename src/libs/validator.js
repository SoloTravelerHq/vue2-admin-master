/*
 * 通用表单校验+单项校验
 * validator: $val({name: '姓名', rule: 'cname', msg: '姓名格式错误！', empty: true}), trigger: 'change'
 * empty为true时 输入值可为空，不为空则校验
 */

const rulep = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  cname: /^(?:[\u4e00-\u9fa5·]{2,16})$/, // 中文姓名
  ename: /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/, // 英文姓名
  newcarid: /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/, // 新能源车牌号
  carid: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, // 非新能源车牌号
  mcarid: /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/, // 车牌号(新能源+非新能源)
  mobilephone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, // 手机号（2022）
  landline: /\d{3}-\d{8}|\d{4}-\d{7}/, // 固话
  idcard: /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/, // 二代身份证
  account: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/, // 帐号是否合法(字母开头，允许4-16字节，允许字母数字下划线组合
  pwd: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符 。
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  ipv6: /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
};

export function $val (args = {}) {
  //
  return function (rule, value, callback) {
    if (!args.empty) {
      if (!value) {
        callback(new Error(`请输入${args.name}!`));
      } else {
        if (rulep[`${args.rule}`].test(value)) {
          callback();
        } else {
          callback(new Error(`${args.msg}`));
        }
      }
    } else {
      if (value === '') {
        callback();
      } else {
        if (rulep[`${args.rule}`].test(value)) {
          callback();
        } else {
          callback(new Error(`${args.msg}`));
        }
      }
    }
  };
}

export function accountValidator (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入用户名'));
  } else {
    if (/^\S{1,50}$/.test(value)) {
      callback();
    } else {
      callback(new Error('不超过50位任意字符'));
    }
  }
}

export function pwdValidator (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入密码！'));
  } else {
    if (/^[a-zA-Z0-9]{6,16}$/.test(value)) {
      callback();
    } else {
      callback(new Error('6到16位数字字母组合'));
    }
  }
}

export function phoneValidator (rule, value, callback) {
  if (!value) {
    !rule.required ? callback() : callback(new Error('请输入手机号码'));
  } else {
    if (/^1[3-9][0-9]{9}$/.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的11位手机号码'));
    }
  }
}

// 国内电话，无分机号
// function telephone(value) {
//   return (
//     /^[0-9]{3}-?[0-9]{8}$/.test(value) || /^[0-9]{4}-?[0-9]{7}$/.test(value)
//   );
// }

// 国际(\+86|0086|086|86)?\-?
// 国内电话，含分机号
function telephone2 (value) {
  return (
    /^[0-9]{3}-?[0-9]{8}([-0-9]{0}|-[0-9]{1,6})$/.test(value) ||
    /^[0-9]{4}-?[0-9]{7}([-0-9]{0}|-[0-9]{1,6})$/.test(value)
  );
}

export function telephoneValidator (rule, value, callback) {
  if (!value) {
    !rule.required ? callback() : callback(new Error('请输入电话号码'));
  } else {
    if (telephone2(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的电话号码'));
    }
  }
}

export function faxValidator (rule, value, callback) {
  if (!value) {
    !rule.required ? callback() : callback(new Error('请输入传真号码'));
  } else {
    if (telephone2(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的传真号码'));
    }
  }
}

export function postalCodeValidator (rule, value, callback) {
  if (!value) {
    !rule.required ? callback() : callback(new Error('请输入邮政编码'));
  } else {
    if (/^[0-9]{6}$/.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的6位邮政编码'));
    }
  }
}
