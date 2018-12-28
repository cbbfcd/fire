import { cacheItem, cacheType } from './interfaces'

export const hasKey = (target: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(target, key)

export const sort = (arr: Array<cacheItem>) => {
  return arr.sort((a, b) => a.priority - b.priority)
}

export const isEmptyString = (str: string) => !str || !str.trim()

export const publish = (target: cacheType, key: string, data?: any) => {
  if (hasKey(target, key)) {
    const listeners = target[key]
    return listeners.map(({ cb }) => cb(data))
  }
}
