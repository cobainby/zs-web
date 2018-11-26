import {createAPI} from '@/utils/request'

export const projectList = data => createAPI("/Foundation/get", 'get', data);
export const projectAdd = data =>createAPI("/Foundation/add.data",'get',data);
export const projectUpdate = data =>createAPI("/Foundation/update.data",'post',data);
export const projectRemove= data=>createAPI(`/Foundation/delete/${data.projectUuid}`,"delete",data)
