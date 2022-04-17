import { request } from '@/utils/request'

/**
 * @description: 获取文章列表
 * @return {Promise<any>}
 */
export const getArticleList = () => {
  return request({
    url: '/article/list',
    method: 'GET',
  })
}

/**
 * @description: 获取文章详情信息
 * @return {Promise<any>}
 */
export const getArticleDesc = (data: any) => {
  return request({
    url: `/article/${data.id}`,
    method: 'GET',
  })
}
