interface cacheItem {
  priority: number,
  cb: Function
}

interface cacheType {
  [propName: string]: Array<cacheItem>
}

export {
  cacheType,
  cacheItem
}