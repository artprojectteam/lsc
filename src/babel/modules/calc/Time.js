import { TIME_SUB } from '../unit'
import Base from './Base'

export default class Time extends Base {
  #idx = {}

  constructor () {
    super(TIME_SUB)

    this.#idx = {
      micro: super.index('μs'),
      ms: super.index('ms'),
      sec: super.index('sec'),
      min: super.index('min'),
      hour: super.index('hour'),
      day: super.index('day')
    }
  }

  selectMicro (number) {
    super.input(number)
    let result = []

    // micro
    result[this.#idx.micro] = number

    // ms
    result[this.#idx.ms] = super.quotient(1000)

    // sec
    const sec = 1000 * 1000
    result[this.#idx.sec] = super.quotient(sec)

    // min
    const min = sec * 60
    result[this.#idx.min] = super.quotient(min)

    // hour
    const hour = min * 60
    result[this.#idx.hour] = super.quotient(hour)

    // day
    const day = hour * 24
    result[this.#idx.day] = super.quotient(day)

    return result
  }

  selectMs (number) {
    let result = []

    // micro
    result[this.#idx.micro] = super.product(1000)

    // ms
    result[this.#idx.ms] = number

    // sec
    result[this.#idx.sec] = super.quotient(1000)

    // min
    const min = 1000 * 60
    result[this.#idx.min] = super.quotient(min)

    // hour
    const hour = min * 60
    result[this.#idx.hour] = super.quotient(hour)

    // day
    const day = hour * 24
    result[this.#idx.day] = super.quotient(day)

    return result
  }

  selectSec (number) {
    super.input(number)
    let result = []

    // micro
    result[this.#idx.micro] = super.product(Math.pow(10, 6))

    // ms
    result[this.#idx.ms] = super.product(1000)

    // sec
    result[this.#idx.sec] = number

    // min
    result[this.#idx.min] = super.quotient(60)

    // hour
    const hour = 60 * 60
    result[this.#idx.hour] = super.quotient(hour)

    // day
    const day = hour * 24
    result[this.#idx.day] = super.quotient(day)

    return result
  }

  selectMin (number) {
    super.input(number)
    let result = []

    // min
    result[this.#idx.min] = number

    // hour
    result[this.#idx.hour] = super.quotient(60)

    // day
    result[this.#idx.day] = super.quotient(60 * 24)

    // sec
    result[this.#idx.sec] = super.product(60)

    // ms
    result[this.#idx.ms] = super.product(60 * 1000)

    // micro
    result[this.#idx.micro] = super.product(60 * Math.pow(10, 6))

    return result
  }

  selectHour (number) {
    super.input(number)
    let result = []

    // hour
    result[this.#idx.hour] = number

    // day
    result[this.#idx.day] = super.quotient(24)

    // min
    result[this.#idx.min] = super.product(60)

    // sec
    const sec = 60 * 60
    result[this.#idx.sec] = super.product(sec)

    // ms
    const ms = sec * 1000
    result[this.#idx.ms] = super.product(ms)

    // micro
    const micro = ms * 1000
    result[this.#idx.micro] = super.product(micro)

    return result
  }

  selectDay (number) {
    super.input(number)
    let result = []

    // day
    result[this.#idx.day] = number

    // hour
    result[this.#idx.hour] = super.product(24)

    // min
    const min = 24 * 60
    result[this.#idx.min] = super.product(min)

    // sec
    const sec = min * 60
    result[this.#idx.sec] = super.product(sec)

    // ms
    const ms = sec * 1000
    result[this.#idx.ms] = super.product(ms)

    // micro
    const micro = ms * 1000
    result[this.#idx.micro] = super.product(micro)

    return result
  }
}