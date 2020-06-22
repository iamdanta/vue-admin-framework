import { LocalDataManager } from './local-storage';

const LAST_STR= 'ADMIN';

// 存储用户信息
export const localDataUser = new LocalDataManager('USER_DATA' + LAST_STR);

// 存储应用信息
export const localDataApp = new LocalDataManager('APP_DATA' + LAST_STR);

// 行政区树
export const localDataArea = new LocalDataManager('AREA_DATA' + LAST_STR);

// 字典数据
export const localDataDic = new LocalDataManager('DIC_DATA' + LAST_STR);
