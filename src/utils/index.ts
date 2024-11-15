import { PlatformInfo } from "./types";

/**
 * @description 获取操作系统信息
 * @returns {{osName: string, osVersion: string, platform: string}}
 */
export const getOsParams = (): PlatformInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  let name = "Unknown";
  let version = "Unknown";
  if (userAgent.indexOf("win") > -1) {
    name = "Windows";
    if (userAgent.indexOf("windows nt 5.0") > -1) {
      version = "Windows 2000";
    } else if (
      userAgent.indexOf("windows nt 5.1") > -1 ||
      userAgent.indexOf("windows nt 5.2") > -1
    ) {
      version = "Windows XP";
    } else if (userAgent.indexOf("windows nt 6.0") > -1) {
      version = "Windows Vista";
    } else if (userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1) {
      version = "Windows 7";
    } else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1) {
      version = "Windows 8";
    } else if (userAgent.indexOf("windows nt 6.3") > -1) {
      version = "Windows 8.1";
    } else if (
      userAgent.indexOf("windows nt 6.2") > -1 ||
      userAgent.indexOf("windows nt 10.0") > -1
    ) {
      version = "Windows 10";
    } else {
      version = "Unknown";
    }
  } else if (userAgent.indexOf("iphone") > -1) {
    name = "Iphone";
  } else if (userAgent.indexOf("mac") > -1) {
    name = "Mac";
  } else if (
    userAgent.indexOf("x11") > -1 ||
    userAgent.indexOf("unix") > -1 ||
    userAgent.indexOf("sunname") > -1 ||
    userAgent.indexOf("bsd") > -1
  ) {
    name = "Unix";
  } else if (userAgent.indexOf("linux") > -1) {
    if (userAgent.indexOf("android") > -1) {
      name = "Android";
    } else {
      name = "Linux";
    }
  } else {
    name = "Unknown";
  }
  return {
    osName: name,
    osVersion: version,
    platform: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "mobile" : "pc",
  };
};

/**
 * isBrowser
 * 检测代码是否运行在浏览器环境
 */

export const isBrowser: boolean = typeof window === "object" && typeof document === "object";

/**
 * 获取cookie
 * new RegExp(`(^| )${name}=([^;]*)(;|$)`) 匹配 name=value 值
 * @param name[可选] cookie名称
 * @returns {Array | string | undefined}
 */

export const getCookie = (name?: string): Array<string> | string | undefined => {
  // Environmental Test
  if (!isBrowser) throw new Error("Non-browser environment, unavailable 'getCookie'");

  if (!document.cookie) throw new Error("No Cookie Found");

  if (name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    return arr ? arr[2] : undefined;
  }

  // Get Cookies && String => Array
  return document.cookie.split(";");
};
