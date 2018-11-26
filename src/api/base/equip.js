import {createAPI} from '@/utils/request'

export const equipList = data => createAPI("/UserEquipment/get", 'get', data)
export const viewEquip = data => createAPI(`/UserEquipment/${data.equipUuid}`, 'get', data)
export const addEquip = data => createAPI("/UserEquipment/add.data", 'post', data)
export const updateEquip = data => createAPI("/UserEquipment/update.data", 'post', data)
export const removeEquip = data => createAPI(`/UserEquipment/delete/${data.equipUuid}`, 'delete', data)
export const equipModelList = data => createAPI("/UserEquipment/model/get", 'get', data)
export const viewEquipModel =data=>createAPI(`/UserEquipment/model/${data.modelUuid}`,'get',data)
export const addEquipModel = data =>createAPI("/UserEquipment/model/add.data",'post',data)
export const updateEquipModel=data=>createAPI("/UserEquipment/model/update.data", 'post', data)
export const removeEquipModel = data => createAPI(`/UserEquipment/model/delete/${data.modelUuid}`, 'delete', data)
export const getSysEquipmentType = data =>createAPI('/getSysEquipmentType',"get",data)
