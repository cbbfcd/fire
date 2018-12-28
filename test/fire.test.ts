import fire from '../src/fire'

describe('Test for synchronous subscription method: fire.on() ', () => {
  test('test fire.on() with no priority', () => {
    fire.on('test', function a() { return 'a'})
    const currCacheList = fire.curr('test')
    expect(currCacheList).toHaveLength(1)
    expect(JSON.stringify(currCacheList)).toEqual(
      JSON.stringify([{ cb: function a() {}, priority: Infinity }])
    )
  })

  test('test fire.on() with priority', () => {
    fire.on('test', function b(){ return 'b' }, 4)
    fire.on('test', function c(d: any){ return d+'c' }, 2)
    const currCacheList = fire.curr('test')
    expect(currCacheList).toHaveLength(3)
    expect(JSON.stringify(currCacheList)).toEqual(
      JSON.stringify([
        { cb: function c(d: any){ return d+'c' }, priority: 2 },
        { cb: function b(){ return 'b' }, priority: 4 },
        { cb: function a(){ return 'a' }, priority: Infinity }
      ])
    )
  })

  test('test fire.emit()', () => {
    const param: any = 'hello'
    const response = fire.emit('test', param)
    expect(response).toEqual({
      key: 'test',
      data: [
        'helloc',
        'b',
        'a'
      ]
    })

    fire.on('test02', function d(){ return 'd' })
    const res = fire.emit(['test', 'test02'], param)
    expect(res).toEqual([
      {
        key: 'test',
        data: [
          'helloc',
          'b',
          'a'
        ]
      },
      {
        key: 'test02',
        data: [
          'd'
        ]
      }
    ])

    fire.emit()
    const all = fire.emit(['test', 'test02'], param)
    expect(all).toEqual([
      {
        key: 'test',
        data: [
          'helloc',
          'b',
          'a'
        ]
      },
      {
        key: 'test02',
        data: [
          'd'
        ]
      }
    ])

    const _res = fire.emit('no_this_key')
    expect(_res).toEqual({"data": undefined, "key": "no_this_key"})
  })

  test('test fire.off()', () => {
    fire.off('test02')
    const res = fire.emit('test02', 'hello')
    expect(res).toEqual({
      key: 'test02',
      data: []
    })
  })

  test('test fire.once()', () => {
    fire.once('test02', function e(){ return 'e' })
    const res = fire.emit('test02')
    expect(res).toEqual({
      key: 'test02',
      data: ['e']
    })
    const response = fire.emit('test02')
    expect(response).toEqual({
      key: 'test02',
      data: []
    })
  })

  test('test fire.destory()', () => {
    fire.destory()
    expect(fire.curr()).toEqual({})
  })

  test('test fire.curr', () => {
    expect(fire.curr()).toEqual({})
    fire.on('test', function f(){ return 'f' })
    expect(JSON.stringify(fire.curr())).toEqual(JSON.stringify({test: [{cb: function f(){ return 'f' }, priority: Infinity}]}))
  })
})