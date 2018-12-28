interface CacheItem {
  priority: number,
  cb: Function
}

interface CacheType {
  [propName: string]: Array<CacheItem>
}

export {
  CacheType,
  CacheItem
}