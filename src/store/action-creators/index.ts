import { Dispatch } from 'redux'
import { LoadingAction, CategoryAction, ActionTypes } from '@/store/action-types'

/**
 * @description: 修改Loading状态
 * @param {boolean} loadingState
 * @return {void}
 */
export const editLoadingState = (loadingState: boolean) => {
  return (dispatch: Dispatch<LoadingAction>) => {
    dispatch({
      type: ActionTypes.LOADING,
      payload: loadingState,
    })
  }
}
/**
 * @description: 设置目录树
 * @param {any} category
 * @return {void}
 */
export const setCategoryState = (category: any) => {
  return (dispatch: Dispatch<CategoryAction>) => {
    dispatch({
      type: ActionTypes.SET_CATEGORY,
      payload: category,
    })
  }
}
