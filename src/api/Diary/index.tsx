import { request } from '@/utils/request'

/**
 * @description: 获取日记列表
 * @return {Promise<any>}
 */
export const getDiaryList = () => {
  return request({
    url: '/diary/list',
    method: 'GET',
  })
}

/**
 * @description: 获取日记详情信息
 * @return {Promise<any>}
 */
export const getDiaryDesc = (data: any) => {
  return request({
    url: `/diary/${data.id}`,
    method: 'GET',
  })
}
