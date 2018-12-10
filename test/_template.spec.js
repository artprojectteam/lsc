import XXXX from '../src/babel/vue/xxxx.vue'
// chai: http://www.chaijs.com/

describe('test', () => {
  it('foo', () => {
    // power assert記法
    assert.equal('a', 'a')
  })
})

describe('test', () => {
  it('foo', () => {
    expect('a').to.equal('a')
  })
})

// Vue
describe('vue', () => {
  const vm = new Vue(XXXX).$mount()

  it('res', () => {
    assert.equal(vm.abc, 1)
  })

  it('add', () => {
    vm.add()
    assert.equal(vm.abc, 2)
  })
})