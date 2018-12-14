import Time from '../src/babel/modules/calc/Time'

describe('time', () => {
  const time = new Time()

  it('μs', () => {
    assert.deepEqual(time.selectMicro(300), [300, 0.3, 0.0003, 0.00001, 0, 0])
  })

  it('ms', () => {
    assert.deepEqual(time.selectMs(300), [300000, 300, 0.3, 0.005, 0.00008, 0])
  })

  it('sec', () => {
    assert.deepEqual(time.selectSec(1200), [1200000000, 1200000, 1200, 20, 0.33333, 0.01389])
  })

  it('min', () => {
    assert.deepEqual(time.selectMin(5000), [300000000000, 300000000, 300000, 5000, 83.33333, 3.47222])
  })

  it('hour', () => {
    assert.deepEqual(time.selectHour(300), [1080000000000, 1080000000
      , 1080000, 18000, 300, 12.5])
  })

  it('day', ()=>{
    assert.deepEqual(time.selectDay(300), [25920000000000, 25920000000, 25920000, 432000, 7200, 300])
  })
})