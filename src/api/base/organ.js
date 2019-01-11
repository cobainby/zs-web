import { createAPI, createFormAPI } from "@/utils/request";

export const Institutes = data => createAPI("/Institutes/get", "get", data);
export const addInstitutes = data => createAPI("/Institutes/add.data", "post", data);
export const updateInstitutes = data => createAPI("/Institutes/update.data", "post", data);
export const remove = data => createAPI(`/Institutes/delete/${data.orgUuid}`, "delete", data);
export const detail = data => createAPI(`/loginUser`, "get", data);//获取当前账户相关信息

export const search = data => {
  return [
  ];
};
