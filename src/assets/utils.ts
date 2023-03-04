/* 辅助函数 */

// 深度克隆
// type CloneParams =
//   | { [key: string]: CloneParams }
//   | unknown[]
//   | number
//   | string
//   | boolean
//   | void;
export function deepClone(target: any) {
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

// 根据数字返回中文月数
export function ToTextOfMonth(m: string | number): string {
  if (typeof m === 'string') m = Number(m)
  const textArr = ['*', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return textArr[m]
}

// 根据小时数，返回对应标语
export function hourSlogan(): string {
  const h: number = Number(new Date().toLocaleTimeString().split(':')[0])
  let slogan = ''
  if (h >= 5 && h <= 10) {
    slogan = '一日之计🙋'
  } else if (h > 10 && h <= 14) {
    slogan = '中午吃点啥？🥣'
  } else if (h > 14 && h <= 18) {
    slogan = '来一杯🥤'
  } else if (h > 18 && h <= 22) {
    slogan = '晚安😊'
  } else if (h < 5 || h > 22 && h <= 24) {
    slogan = '记得休息😴'
  }
  return slogan
}