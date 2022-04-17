// Action声明
export interface LoadingAction {
  type: string
  payload: boolean
}
export interface CategoryAction {
  type: string
  payload: any
}

// Action类型枚举
export enum ActionTypes {
  LOADING = 'LOADING',
  SET_CATEGORY = 'SET_CATEGORY',
}
