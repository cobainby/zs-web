import { createAPI} from "@/utils/request";

export const getHorizontal = data => createAPI("/fdData/horizontal/get", "get", data);//获得水平位移数据
export const getVertical = data => createAPI("/fdData/vertical/get", "get", data);//获得竖向位移数据
export const getWater = data => createAPI(`/fdData/water/get`, "get", data);//获得地下水位数据
export const getCliPointNumbers = data => createAPI(`/fdData/clinometer/get`, "get", data);//获得测斜点号和次数
export const getClinometer=data=>createAPI(`/fdData/clinometer/surveypoint`,"get",data);//获得测斜数据
export const getForce = data => createAPI(`/fdData/force/get`, "get", data);//支撑内力的数据
export const getQx = data =>createAPI(`/fdData/qx`);//倾斜数据
export const getLf = data =>createAPI(`/fdData/Lf`);//裂缝数据
export const getMonitorTotal=data=>createAPI(`/monitorTotal/gets`, "get", data);//拿到所有监测项数据统计
export const verticalExport = data => createAPI("/fdData/vertical/export", "get", data);//获得竖向位移报表导出接口
export const dailyExport = data=> createAPI("/daily/export","post",data);//日报导出功能
export const fdPatrolList=data=>createAPI("/fdPatrol/history/get","get",data);//拿到所有巡视监测数据列表
export const fdPatrol=data=>createAPI(`fdPatrol/history/${data.uuid}`,"get",data);//拿到所选巡视记录详情

