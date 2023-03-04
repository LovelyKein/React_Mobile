/* 辅助函数 */

// 深度克隆
// type CloneParams =
//   | { [key: string]: CloneParams }
//   | unknown[]
//   | number
//   | string
//   | boolean
//   | void;
function deepClone(target: any) {
  if (typeof target === 'undefined') throw new Error('请传递正确的值')
  let result: unknown
  const BASE_TYPE = ['number', 'string', 'boolean', 'function']
  if (BASE_TYPE.includes(typeof target)) {
    result = target
  } else {
    if(Array.isArray(target)) {
      // 数组
      const newValue: unknown[] = []
      target.forEach((item, index) => {
        newValue[index] = deepClone(item)
      })
      result = newValue
    } else if (target instanceof Object) {
      // 对象
      const newValue: {[key: string]: unknown} = {}
      for (let key in target) {
        newValue[key] = deepClone(target[key])
      }
      result = newValue
    }
  }
  return result
}

export {
  deepClone
}