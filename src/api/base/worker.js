import { createAPI, createFormAPI } from "@/utils/request";

export const UserAccount = data => createAPI("/UserAccount/get", "get", data);
export const viewAccount = data =>createAPI(`/UserAccount/${data.accountUuid}`,"get", data);
export const addAccount = data => createAPI("/UserAccount/add.data", "post", data);
export const updateAccount = data => createAPI(`/UserAccount/update.data`, "post", data);
export const removeAccount = data => createAPI(`/UserAccount/delete/${data.accountUuid}`, "delete", data);
export const updatePassword = data=>createFormAPI(`/UserAccount/setPassword`,"post",data);//修改密码
