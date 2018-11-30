import {createAPI} from '@/utils/request'

export const projectList = data => createAPI("/Foundation/get", 'get', data);
export const projectAdd = data =>createAPI("/Foundation/add.data",'post',data);
export const projectUpdate = data =>createAPI("/Foundation/update.data",'post',data);
export const projectRemove= data=>createAPI(`/Foundation/delete/${data.projectUuid}`,"delete",data)
export const getSafety=data=>createAPI(`/getSysSafetyClass`,'get',data);//获取安全状态表
export const getStep=data=>createAPI(`/getSysConstructionStep`,'get',data);//获取施工工况的信息
export const getState=data=>createAPI(`/getSysConstructionState `,'get',data);//获取项目当前状态