import { isArray } from '@/utils/is'
/**
 * @description: 将字符串中的链接替换为a标签
 * @param {string} str
 * @return {string}
 */
export const reaplceLink = (str: string) => {
  const reg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi
  str = str.replace(reg, "<a href='$1' style='text-decoration: underline;' target='_blank'>$1</a>")
  return str
}

interface NodeElement {
  hLevel: number
  level?: number
  children?: NodeElement[]
}
/**
 * @description: 根据指定元素级别查找该级别的子孙级，并删除掉已经查找到的子孙级
 * @param {NodeElement} currentLevelItem 当前遍历的最高级
 * @param {NodeElement[]} arr 数据源
 * @param {number} level 当前遍历
 * @return {NodeElement[]}
 */
const getChildrenByLevel = (currentLevelItem: NodeElement, arr: NodeElement[], level: number) => {
  if (!currentLevelItem) {
    return []
  }
  // 将level值转成负数，再进行比较
  const minusCurrentLevel = -currentLevelItem.hLevel
  const children = []
  for (let i = 0, len = arr.length; i < len; i++) {
    const levelItem = arr[i]
    // 只查找当前遍历这级的子级
    if (-levelItem.hLevel < minusCurrentLevel) {
      children.push(levelItem)
    } else {
      break
    }
  }
  // 从数组中删除已经找到的那些子孙级，以免影响到其他子孙级的查找
  if (children.length > 0) {
    arr.splice(0, children.length)
  }
  return children
}
/**
 * @description: 递归遍历当前传入数组
 * @param {Array} result
 * @param {Array} arr
 * @param {number} level
 * @return {*}
 */
const getTree = function (result: NodeElement[], arr: NodeElement[], level: number) {
  if (!isArray(arr) || arr.length <= 0) {
    return []
  }
  // 首先将数组第一位移除掉，并添加到结果集中
  let currentItem = arr.shift()
  if (currentItem) {
    currentItem.level = level
    result.push(currentItem)
  }
  while (arr.length > 0) {
    if (!currentItem) {
      return
    }
    // 根据当前级别获取它的子孙级
    const children = getChildrenByLevel(currentItem, arr, level)
    // 如果当前级别没有子孙级则开始下一个
    if (children?.length === 0) {
      currentItem = arr.shift()
      if (currentItem) {
        currentItem.level = level
        result.push(currentItem)
      }
      continue
    }
    currentItem.children = []
    // 查找到的子孙级继续查找子孙级
    getTree(currentItem.children, children, level + 1)
  }
}
/**
 * @description: 根据页面已有h标签并生成树结构
 * @param {Array} flatArr
 * @return {Array}
 */
export const toTree = (flatArr: NodeElement[]) => {
  const tree: NodeElement[] = []
  const copyArr = flatArr.map(function (item) {
    return item
  })
  getTree(tree, copyArr, 1)
  return tree
}

/**
 * @description: 根据已知根元素节点遍历并筛选其指定节点
 * @param {any} root
 * @param {Element} nodes
 * @param {string[]} tags
 * @return {Element[]}
 */
export const diffDom = (root: any, nodes: Element[] = [], tags: string[] = []) => {
  if (!root) return []
  for (let i = 0; i < root.childNodes.length; i++) {
    const node: Element = root.childNodes[i]
    // 过滤 text 节点、script 节点
    if (node.nodeType !== 3 && node.nodeName !== 'SCRIPT' && tags.includes(node.tagName)) {
      nodes.push(node)
      diffDom(node)
    }
  }
  return nodes
}
/**
 * @description: html字符串转换真实Dom
 * @param {string} txt
 * @return {*}
 */
export const stringToDom = (txt: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(txt, 'text/xml')
  return doc
}
