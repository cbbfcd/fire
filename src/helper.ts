import { CacheItem, CacheType } from './interfaces'

export const hasKey = (target: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(target, key)

export const sort = (arr: Array<CacheItem>) => {
  return arr.sort((a, b) => a.priority - b.priority)
}

export const isEmptyString = (str: string) => !str || !str.trim()

export const publish = (target: CacheType, key: string, data?: any) => {
  if (hasKey(target, key)) {
    const listeners = target[key]
    return listeners.map(({ cb }) => cb(data))
  }
}

export const unSubcribe = (key: string, cache: CacheType, fn?: Function) => {
  if(hasKey(cache, key)){
    if(!fn){
      return (cache[key] = [])
    }

    cache[key] = cache[key].filter(({ cb }) => cb !== fn)
  }
}
