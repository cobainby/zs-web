import { createAPI, createFormAPI } from "@/utils/request";

export const getKey = data => createAPI("/getPublicKey", "get", data);
export const login = data => createFormAPI("/Login", "post", data);
export const testLogin = data => createAPI(`/apkLogin/${data.userid}`, "post", data);
export const register = data => createAPI("/base/frame/register", "post", data);
export const logout = data => createAPI("/base/frame/logout", "post", data);
export const passwd = data => createAPI("/base/frame/passwd", "post", data);
export const profile = data => createAPI("/base/frame/profile", "post", data);
