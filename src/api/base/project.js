import {createAPI,createFormAPI} from '@/utils/request'
//工程相关
export const projectList = data => createAPI("/Foundation/get", 'get', data);//工程列表
export const projectAdd = data =>createAPI("/Foundation/add.data",'post',data);//增加工程
export const projectUpdate = data =>createAPI("/Foundation/update.data",'post',data);//更新工程
export const projectRemove= data=>createAPI(`/Foundation/delete/${data.projectUuid}`,"delete",data)//删除工程
export const getSafety=data=>createAPI(`/getSysSafetyClass`,'get',data);//获取安全状态表
export const getStep=data=>createAPI(`/getSysConstructionStep`,'get',data);//获取施工工况的信息
export const getState=data=>createAPI(`/getSysConstructionState `,'get',data);//获取项目当前状态
export const addProjectFile=data=>createFormAPI(`/Foundation/programme/add.data`,'post',data);//上传工程相关文件
export const getFileList=data=>createAPI(`/Foundation/programme/get`,'get',data);//获取项目当前上传的文件列表
export const deleteFile=data=>createAPI(`/Foundation/programme/delete/${data.progUuid}`,'delete',data);//删除上传的文件
export const downFile=data=>createAPI(`/Foundation/programme/viewFile`,'get',data);//下载该文件
export const addProjectPic=data=>createFormAPI(`Foundation/plan/add`,'post',data);//上传工程平面图
export const getProjectPic=data=>createAPI(`/Foundation/plan/get`,'get',data);//获取上传的工程平面图
//监测项设置相关
export const getFdSet=data=>createAPI(`/fdSetting/mitem/get`,'get',data);//查询监测项设置信息
export const viewFdSet=data=>createAPI(`/fdSetting/mitem/${data.monitorItemUuid}`,"get",data);//查询具体某个监测项设置信息
export const addFdSet=data=>createAPI(`/fdSetting/mitem/add.data`,"post",data);//添加监测项设置
export const updateFdSet=data=>createAPI(`/fdSetting/mitem/update.data`,'post',data);//编辑监测项设置信息
export const removeFdSet=data=>createAPI(`/fdSetting/mitem/delete/${data.monitorItemUuid}`,"delete",data);//删除监测项设置信息
export const getMonitor=data=>createAPI(`/getSysMonitorItem`,"get",data);//获得当前监测项种类
// 监测点设置相关
export const getSuveyPointSet=data=>createAPI(`/fdSetting/surveypoint/get`,'get',data);//查询具体某个监测项的监测点信息
export const viewSuveryPointSet=data=>createAPI(`/fdSetting/surveypoint/${data.surveypointUuid}`,"get",data);//查询指定监测点的测点设置信息
export const addSuveyPointSet=data=>createAPI(`/fdSetting/surveypoint/add.data`,'post',data);//添加某个监测项的监测点信息
export const updateSuveyPointSet=data=>createAPI(`/fdSetting/surveypoint/update.data`,'post',data);//修改某个监测项的某个监测点信息
export const removeSuveyPointSet=data=>createAPI(`/fdSetting/surveypoint/delete/${data.surveypointUuid}`,'delete',data);//删除某个监测项的某个监测点信息
// 报警设置 
export const getWarningSet=data=>createAPI(`/fdSetting/warning/item`,'get',data);//查询具体某个监测项的所有报警设置信息
export const viewWarningSet=data=>createAPI(`/fdSetting/warning/${data.warningUuid}`,'get',data);//查询具体某个监测项的某一个报警设置信息
export const addWarningSet=data=>createAPI(`/fdSetting/warning/add.data`,"post",data);//添加监测项的报警设置
export const updateWarningSet=data=>createAPI(`/fdSetting/warning/update.data`,'post',data);//修改某个监测项的某个报警设置信息
export const removeWarningSet=data=>createAPI(`/fdSetting/warning/delete/${data.warningUuid}`,'delete',data);//删除某个监测项的某个报警设置信息 
// 断面设置 
export const getSectionSet=data=>createAPI(`/fdSetting/section/get`,'get',data);//查询具体某个监测项的所有断面设置信息,暂时以查询该工程下所有断面设置作为替代
export const viewSectionSet=data=>createAPI(`/fdSetting/section/${data.sectionUuid}`,'get',data);//查询具体某个监测项的某一个断面设置信息
export const addSectionSet=data=>createAPI(`/fdSetting/section/add.data`,"post",data);//添加监测项的断面设置
export const updateSectionSet=data=>createAPI(`/fdSetting/section/update.data`,'post',data);//修改某个监测项的某个断面设置信息
export const removeSectionSet=data=>createAPI(`/fdSetting/section/delete/${data.sectionUuid}`,'delete',data);//删除某个监测项的某个断面设置信息 
