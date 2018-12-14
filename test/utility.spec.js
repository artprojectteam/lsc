import Util from '../src/babel/modules/Util'

describe('round digit', () => {
  it('100.555555 => 100.55556', () => {
    assert.equal(Util.digitRound(100.555555), 100.55556)
  })

  it('100.111111 => 100.11111', () => {
    assert.equal(Util.digitRound(100.111111), 100.11111)
  })
})