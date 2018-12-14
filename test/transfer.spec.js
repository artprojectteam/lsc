import Transfer from '../src/babel/modules/calc/Transfer'

describe('transfer', () => {
  const transfer = new Transfer()

  it('byte', () => {
    assert.deepEqual(transfer.selectByte(5000), [5000, 4.88281, 0.00477, 0, 0, 0])
  })

  it('kb', () => {
    assert.deepEqual(transfer.selectKB(3000), [3072000, 3000, 2.92969, 0.00286, 0, 0])
  })

  it('mb', () => {
    assert.deepEqual(transfer.selectMB(4630), [4854906880, 4741120, 4630, 4.52148, 0.00442, 0])
  })

  it('gb', () => {
    assert.deepEqual(transfer.selectGB(600), [644245094400, 629145600, 614400, 600, 0.58594, 0.00057])
  })

  it('tb', () => {
    assert.deepEqual(transfer.selectTB(1050), [1154487209164800, 1127428915200, 1101004800, 1075200, 1050, 1.02539])
  })

  it('pb', () => {
    assert.deepEqual(transfer.selectPB(3469), [3905746776837062700, 3814205836754944, 3724810387456, 3637510144, 3552256, 3469])
  })
})
