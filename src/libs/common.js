/*
 * 公共工具
 */
import router from "@/router";

// 保留监测值小数，默认保留1位小数，当小数小于0.1时四舍五入保留一个非0数
export function formatMonitorValue (value, decimal = 1) {
  if (/^-?[0-9]+(\.[0-9]+)?$/.test(value)) {
    if (Math.abs(value) >= Math.pow(0.1, decimal)) {
      return parseFloat(value).toFixed(decimal);
    } else {
      const result = `${value}`.match(/^-?0.0+[1-9]\d?/);
      if (result) {
        const temp = result[0].match(/0+[1-9]/);
        // 确保最后一位非0
        return parseFloat(result[0])
          .toFixed(temp[0].length)
          .replace(/0$/, "");
      } else {
        return value;
      }
    }
  } else {
    return value;
  }
}

export function goLogin () {
  if (router.currentRoute.path !== "/login") {
    router.push("/login");
  }
}

export function goHome () {
  router.push("/home");
}
