import { createAPI, createFormAPI } from "@/utils/request";

export const UserAccount = data => createAPI("UserAccount/get", "get", data);
export const add = data => createFormAPI("/base/menus", "post", data);
export const update = data => createAPI(`/base/menus/${data.id}`, "put", data);
