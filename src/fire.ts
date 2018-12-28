import { hasKey, sort, isEmptyString, publish, unSubcribe } from './helper'
import { CacheType, CacheItem } from './interfaces'

class Fire {
  private cache: CacheType = {}

  on(evtName: string, cb: Function, priority: number = Infinity) {

    if (!this.cache[evtName]) {
      this.cache[evtName] = []
    }

    const listeners = this.cache[evtName]

    const item: CacheItem = {
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

  off(evtName: string | Array<string>, fn?: Function) {

    if(Array.isArray(evtName)){
      evtName.forEach(key => {
        unSubcribe(key, this.cache, fn)
      })
      return
    }

    unSubcribe(evtName, this.cache, fn)
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
