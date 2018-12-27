import { hasKey, sort, isEmptyString } from './helper'
import { cacheType, cacheItem } from './interfaces'

class Fire {
  
  private cache: cacheType = {}

  on(evtName: string, cb: Function, priority: number = Infinity) {

    if(isEmptyString(evtName) || !cb) throw new Error('Subscription parameters is illegal!')

    if(!this.cache[evtName]) {
      this.cache[evtName] = []
    }

    const listeners = this.cache[evtName]

    const item: cacheItem = {
      cb,
      priority
    }

    if(Number.isFinite(priority)) {
      listeners.push(item)
      sort(listeners)
      return
    }

    listeners.push(item)
  }

  emit(evtName?: string, data?: any) {

    if(isEmptyString(evtName)) {
      return Object.keys(this.cache).map(key => {
        const listeners = this.cache[key]
        return listeners.map(({ cb }) => cb && cb(data))
      })
    }

    if(evtName && hasKey(this.cache, evtName)) {
      const listeners = this.cache[evtName]
      return listeners.map(({ cb }) => cb && cb(data))
    }
  }

  off(evtName?: string) {
    
    if(!evtName) {
      this.cache = {}
      return
    }

    if(hasKey(this.cache, evtName)) {
      this.cache[evtName] = []
    }
  }

  once(evtName: string, cb: Function, priority: number = Infinity) {
    
  }

  curr() {
    return this.cache
  }
}

export default new Fire()