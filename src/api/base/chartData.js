import { createAPI} from "@/utils/request";

export const getHorizontal = data => createAPI("/fdData/horizontal/get", "get", data);//获得水平位移数据
export const getVertical = data => createAPI("/fdData/vertical/get", "get", data);//获得竖向位移数据
export const getWater = data => createAPI(`/fdData/water/get`, "get", data);//获得地下水位数据
export const getClinometer = data => createAPI(`/fdData/clinometer/get`, "get", data);//获得测斜数据
export const getForce = data => createAPI(`/fdData/force/get`, "get", data);//支撑内力的数据
