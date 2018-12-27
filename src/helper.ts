import { cacheItem } from './interfaces'

export const hasKey = (target: object, key: string): boolean => Object.prototype.hasOwnProperty.call(target, key)

export const sort = (arr: Array<cacheItem>) => {
  return arr.sort((a, b) => a.priority - b.priority)
}

export const isEmptyString = (str: string | undefined) => !str || !str.trim()