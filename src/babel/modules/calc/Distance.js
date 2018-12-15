import { DISTANCE_SUB } from '../unit'
import Base from './Base'

export default class Distance extends Base {
  #idx = {}

  // メートル換算
  #mile = 1609.344

  // メートル換算
  #yard = 0.9144

  // メートル換算
  #foot = 0.3048

  // ミリメートル換算
  #inch = 25.4

  // キロメートル換算
  #knot = 1.852

  constructor () {
    super(DISTANCE_SUB)

    this.#idx = {
      mm: super.index('mm'),
      cm: super.index('cm'),
      m: super.index('m'),
      km: super.index('km'),
      mile: super.index('mile'),
      yard: super.index('yard'),
      foot: super.index('foot'),
      inch: super.index('inch'),
      knot: super.index('knot')
    }
  }

  selectMm (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = number
    result[this.#idx.cm] = super.quotient(10)
    result[this.#idx.m] = super.quotient(1000)
    result[this.#idx.km] = super.quotient(1000000)
    result[this.#idx.mile] = super.quotient(this.#mile * 1000)
    result[this.#idx.yard] = super.quotient(this.#yard * 1000)
    result[this.#idx.foot] = super.quotient(this.#foot * 1000)
    result[this.#idx.inch] = super.quotient(this.#inch)
    result[this.#idx.knot] = super.quotient(this.#knot * 1000000)

    return result
  }

  selectCm (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(10)
    result[this.#idx.cm] = number
    result[this.#idx.m] = super.quotient(100)
    result[this.#idx.km] = super.quotient(100000)
    result[this.#idx.mile] = super.quotient(this.#mile * 100)
    result[this.#idx.yard] = super.quotient(this.#yard * 100)
    result[this.#idx.foot] = super.quotient(this.#foot * 100)
    result[this.#idx.inch] = super.quotient(this.#inch / 10)
    result[this.#idx.knot] = super.quotient(this.#knot * 100000)

    return result
  }

  selectM (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(1000)
    result[this.#idx.cm] = super.product(10)
    result[this.#idx.m] = number
    result[this.#idx.km] = super.quotient(1000)
    result[this.#idx.mile] = super.quotient(this.#mile)
    result[this.#idx.yard] = super.quotient(this.#yard)
    result[this.#idx.foot] = super.quotient(this.#foot)
    result[this.#idx.inch] = super.quotient(this.#inch / 1000)
    result[this.#idx.knot] = super.quotient(this.#knot * 1000)

    return result
  }

  selectKm (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(1000000)
    result[this.#idx.cm] = super.product(100000)
    result[this.#idx.m] = super.product(1000)
    result[this.#idx.km] = number
    result[this.#idx.mile] = super.quotient(this.#mile / 1000)
    result[this.#idx.yard] = super.quotient(this.#yard / 1000)
    result[this.#idx.foot] = super.quotient(this.#foot / 1000)
    result[this.#idx.inch] = super.quotient(this.#inch / 1000000)
    result[this.#idx.knot] = super.quotient(this.#knot)

    return result
  }

  selectMile (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(this.#mile * 1000)
    result[this.#idx.cm] = super.product(this.#mile * 100)
    result[this.#idx.m] = super.product(this.#mile)
    result[this.#idx.km] = super.product(this.#mile / 1000)
    result[this.#idx.mile] = number
    result[this.#idx.yard] = super.product(this.#mile / this.#yard)
    result[this.#idx.foot] = super.product(this.#mile / this.#foot)
    result[this.#idx.inch] = super.product((this.#mile * 1000) / this.#inch)
    result[this.#idx.knot] = super.product((this.#mile / 1000) / this.#knot)

    return result
  }

  selectYard (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(this.#yard * 1000)
    result[this.#idx.cm] = super.product(this.#yard * 100)
    result[this.#idx.m] = super.product(this.#yard)
    result[this.#idx.km] = super.product(this.#yard / 1000)
    result[this.#idx.mile] = super.product(this.#yard / this.#mile)
    result[this.#idx.yard] = number
    result[this.#idx.foot] = super.product(3)
    result[this.#idx.inch] = super.product((this.#yard * 1000) / this.#inch)
    result[this.#idx.knot] = super.product((this.#yard / 1000) / this.#knot)

    return result
  }

  selectFoot (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(this.#foot * 1000)
    result[this.#idx.cm] = super.product(this.#foot * 100)
    result[this.#idx.m] = super.product(this.#foot)
    result[this.#idx.km] = super.product(this.#foot / 1000)
    result[this.#idx.mile] = super.product(this.#foot / this.#mile)
    result[this.#idx.yard] = super.quotient(3)
    result[this.#idx.foot] = number
    result[this.#idx.inch] = super.product((this.#foot * 1000) / this.#inch)
    result[this.#idx.knot] = super.product((this.#foot / 1000) / this.#knot)

    return result
  }

  selectInch (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product(this.#inch)
    result[this.#idx.cm] = super.product(this.#inch / 10)
    result[this.#idx.m] = super.product(this.#inch / 1000)
    result[this.#idx.km] = super.product(this.#inch / 1000000)
    result[this.#idx.mile] = super.product(this.#inch / (this.#mile * 1000))
    result[this.#idx.yard] = super.product(this.#inch / (this.#yard * 1000))
    result[this.#idx.foot] = super.product(this.#inch / (this.#foot * 1000))
    result[this.#idx.inch] = number
    result[this.#idx.knot] = super.product(this.#inch / (this.#knot * 1000000))

    return result
  }

  selectKnot (number) {
    super.input(number)
    let result = []

    result[this.#idx.mm] = super.product((this.#knot * 1000000))
    result[this.#idx.cm] = super.product(this.#knot * 100000)
    result[this.#idx.m] = super.product(this.#knot * 1000)
    result[this.#idx.km] = super.product(this.#knot)
    result[this.#idx.mile] = super.product((this.#knot * 1000) / this.#mile)
    result[this.#idx.yard] = super.product((this.#knot * 1000) / this.#yard)
    result[this.#idx.foot] = super.product((this.#knot * 1000) / this.#foot)
    result[this.#idx.inch] = super.product((this.#knot * 1000000) / this.#inch)
    result[this.#idx.knot] = number

    return result
  }
}