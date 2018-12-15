import Distance from '../src/babel/modules/calc/Distance'

describe('distance', () => {
  const distance = new Distance()

  it('mm', () => {
    const res1 = distance.selectMm(100)
    const ans1 = [100, 10, 0.1, 0.0001, 0.00006, 0.10936, 0.32808, 3.93701, 0.00005]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }

    const res2 = distance.selectMm(1456)
    const ans2 = [1456, 145.6, 1.456, 0.00146, 0.0009, 1.5923, 4.7769, 57.32283, 0.00079, 3.93700, 5.39956]

    for (let i = 0, iLen = res2.length; i < iLen; i++) {
      assert.equal(res2[i], ans2[i])
    }
  })

  it('cm', () => {
    const res1 = distance.selectCm(100)
    const ans1 = [1000, 100, 1, 0.001, 0.00062, 1.09361, 3.28084, 39.37008, 0.00054]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }

    const res2 = distance.selectCm(36724)
    const ans2 = [367240, 36724, 367.24, 0.36724, 0.22819, 401.61855, 1204.85564, 14458.26772, 0.19829]

    for (let i = 0, iLen = res2.length; i < iLen; i++) {
      assert.equal(res2[i], ans2[i])
    }
  })

  it('m', () => {
    const res1 = distance.selectM(100)
    const ans1 = [100000, 1000, 100, 0.1, 0.06214, 109.36133, 328.08399, 3937.00787, 0.054]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }

    const res2 = distance.selectM(594834)
    const ans2 = [594834000, 5948340, 594834, 594.834, 369.61271, 650518.3727, 1951555.11811, 23418661.41732, 321.18467]

    for (let i = 0, iLen = res2.length; i < iLen; i++) {
      assert.equal(res2[i], ans2[i])
    }
  })

  it('km', () => {
    const res1 = distance.selectKm(100)
    const ans1 = [100000000, 10000000, 100000, 100, 62.13712, 109361.32983, 328083.9895, 3937007.87402, 53.99568]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }

    const res2 = distance.selectKm(7620)
    const ans2 = [7620000000, 762000000, 7620000, 7620, 4734.84848, 8333333.33333, 25000000, 300000000, 4114.47084]

    for (let i = 0, iLen = res2.length; i < iLen; i++) {
      assert.equal(res2[i], ans2[i])
    }
  })

  it('mile', () => {
    const res1 = distance.selectMile(100)
    const ans1 = [160934400, 16093440, 160934.4, 160.9344, 100, 176000, 528000, 6336000, 86.89762]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }
  })

  it('yard', () => {
    const res1 = distance.selectYard(100)
    const ans1 = [91440, 9144, 91.44, 0.09144, 0.05682, 100, 300, 3600, 0.04937]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }
  })

  it('foot', () => {
    const res1 = distance.selectFoot(100)
    const ans1 = [30480, 3048, 30.48, 0.03048, 0.01894, 33.33333, 100, 1200, 0.01646]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }
  })

  it('inch', () => {
    const res1 = distance.selectInch(100)
    const ans1 = [2540, 254, 2.54, 0.00254, 0.00158, 2.77778, 8.33333, 100, 0.00137]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }
  })

  it('knot', () => {
    const res1 = distance.selectKnot(100)
    const ans1 = [185200000, 18520000, 185200, 185.2, 115.07794, 202537.18285, 607611.54856, 7291338.58268, 100]

    for (let i = 0, iLen = res1.length; i < iLen; i++) {
      assert.equal(res1[i], ans1[i])
    }
  })
})