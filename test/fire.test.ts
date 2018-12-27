import fire from '../src/fire'

describe('Test for synchronous subscription method: fire.on() ', () => {
  test('test fire.on() with no priority', () => {
    fire.on('test', function test() {})
    const currCacheList = fire.curr('test')
    expect(currCacheList).toHaveLength(1)
    expect(JSON.stringify(currCacheList)).toEqual(
      JSON.stringify([{ cb: function test() {}, priority: Infinity }])
    )
  })

  test('test fire.on() with priority', () => {})
})
