import { hasKey, sort, isEmptyString, publish } from './helper'
import { cacheType, cacheItem } from './interfaces'

class Fire {
  private cache: cacheType = {}

  on(evtName: string, cb: Function, priority: number = Infinity) {

    if (!this.cache[evtName]) {
      this.cache[evtName] = []
    }

    const listeners = this.cache[evtName]

    const item: cacheItem = {
      cb,
      priority
    }

    listeners.push(item)

    if (Number.isFinite(priority)) {
      sort(listeners)
    }
  }

  emit(evtName?: string | Array<string>, data?: any) {
    if (Array.isArray(evtName)) {
      return evtName.map(key => ({
        key,
        data: publish(this.cache, key, data)
      }))
    }

    if (typeof evtName === 'string' && !isEmptyString(evtName)) {
      return {
        key: evtName,
        data: publish(this.cache, evtName, data)
      }
    }

    if (!evtName) {
      return Object.keys(this.cache).map(key => ({
        key,
        data: publish(this.cache, key, data)
      }))
    }
  }

  off(evtName: string, fn?: Function) {
    if (!isEmptyString(evtName) && hasKey(this.cache, evtName)) {
      if (!fn) {
        return (this.cache[evtName] = [])
      }

      this.cache[evtName] = this.cache[evtName].filter(({ cb }) => cb !== fn)
    }
  }

  destory() {
    this.cache = {}
  }

  once(evtName: string, cb: Function, priority: number = Infinity) {
    const callback = (args: any) => {
      this.off(evtName, callback)
      return cb(args)
    }

    this.on(evtName, callback, priority)
  }

  curr(evtName?: string) {
    return evtName ? this.cache[evtName] : this.cache
  }
}

export default new Fire()
