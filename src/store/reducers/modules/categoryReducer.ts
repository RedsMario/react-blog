/*
 * @Author: Mario
 * @Date: 2022-03-05 13:26:13
 * @LastEditTime: 2022-03-17 21:20:26
 * @LastEditors: Mario
 * @Description: 目录树
 */
import { CategoryAction, ActionTypes } from '@/store/action-types'
const initCategory: any[] = []
const categoryReducer = (state: any[] = initCategory, action: CategoryAction) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORY:
      return action.payload
    default:
      return state
  }
}

export default categoryReducer
