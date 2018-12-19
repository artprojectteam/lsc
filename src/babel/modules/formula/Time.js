import { TIME_SUB, TIME_U_DAY, TIME_U_HOUR, TIME_U_MICRO, TIME_U_MIN, TIME_U_MS, TIME_U_SEC } from '../unit'
import Base from './Base'

export default class Time extends Base {
  atMicro (result) {
    const unit = 'microsecond to'

    const micro = '1000μs'
    const ms = '1000ms'
    const sec = `${micro} * ${ms}`
    const min = `${sec} * 60sec`
    const hour = `${min} * 60min`
    const day = `${hour} * 24hour`

    switch (TIME_SUB[result]) {
      case TIME_U_MICRO:
        return super.notRequire()
      case TIME_U_MS:
        return {
          title: this.#to(unit, TIME_U_MS),
          body: `${TIME_U_MS} = ${TIME_U_MICRO} / ${micro}`
        }
      case TIME_U_SEC:
        return {
          title: this.#to(unit, TIME_U_SEC),
          body: `${TIME_U_SEC} = ${TIME_U_MICRO} / (${sec})`
        }
      case TIME_U_MIN:
        return {
          title: this.#to(unit, TIME_U_MIN),
          body: `${TIME_U_MIN} = ${TIME_U_MICRO} / (${min})`
        }
      case TIME_U_HOUR:
        return {
          title: this.#to(unit, TIME_U_HOUR),
          body: `${TIME_U_HOUR} = ${TIME_U_MICRO} / (${hour})`
        }
      case TIME_U_DAY:
        return {
          title: this.#to(unit, TIME_U_DAY),
          body: `${TIME_U_DAY} = ${TIME_U_MICRO} / (${day})`
        }
      default:
        return super.unknown()
    }
  }

  atMs (result) {
    const unit = 'millisecond to'

    const ms = '1000ms'
    const min = `${ms} * 60sec`
    const hour = `${min} * 60min`
    const day = `${hour} * 24hour`

    switch (TIME_SUB[result]) {
      case TIME_U_MICRO:
        return {
          title: this.#to(unit, TIME_U_MICRO),
          body: `${TIME_U_MICRO} = ${TIME_U_MS} * ${ms}`
        }
      case TIME_U_MS:
        return super.notRequire()
      case TIME_U_SEC:
        return {
          title: this.#to(unit, TIME_U_SEC),
          body: `${TIME_U_SEC} = ${TIME_U_MS} / ${ms}`
        }
      case TIME_U_MIN:
        return {
          title: this.#to(unit, TIME_U_MIN),
          body: `${TIME_U_MIN} = ${TIME_U_MS} / (${min})`
        }
      case TIME_U_HOUR:
        return {
          title: this.#to(unit, TIME_U_HOUR),
          body: `${TIME_U_HOUR} = ${TIME_U_MS} / (${hour})`
        }
      case TIME_U_DAY:
        return {
          title: this.#to(unit, TIME_U_DAY),
          body: `${TIME_U_DAY} = ${TIME_U_MS} / (${day})`
        }
      default:
        return super.unknown()
    }
  }

  atSec (result) {
    const unit = `second to`

    const sec = '60sec'
    const hour = `${sec} * 60min`
    const day = `${hour} * 24hour`

    switch (TIME_SUB[result]) {
      case TIME_U_MICRO:
        return {
          title: this.#to(unit, TIME_U_MICRO),
          body: `${TIME_U_MICRO} = ${TIME_U_SEC} * 1000000μs`
        }
      case TIME_U_MS:
        return {
          title: this.#to(unit, TIME_U_MS),
          body: `${TIME_U_MS} = ${TIME_U_SEC} * 1000ms`
        }
      case TIME_U_SEC:
        return super.notRequire()
      case TIME_U_MIN:
        return {
          title: this.#to(unit, TIME_U_MIN),
          body: `${TIME_U_MIN} = ${TIME_U_SEC} / ${sec}`
        }
      case TIME_U_HOUR:
        return {
          title: this.#to(unit, TIME_U_HOUR),
          body: `${TIME_U_HOUR} = ${TIME_U_SEC} / (${hour})`
        }
      case TIME_U_DAY:
        return {
          title: this.#to(unit, TIME_U_DAY),
          body: `${TIME_U_DAY} = ${TIME_U_SEC} / (${day})`
        }
      default:
        return super.unknown()
    }
  }

  atMin (result) {
    const unit = `minute to`

    switch (TIME_SUB[result]) {
      case TIME_U_MICRO:
        return {
          title: this.#to(unit, TIME_U_MICRO),
          body: `${TIME_U_MICRO} = ${TIME_U_MIN} * 60sec * 1000000μs`
        }
      case TIME_U_MS:
        return {
          title: this.#to(unit, TIME_U_MS),
          body: `${TIME_U_MS} = ${TIME_U_MIN} * 60sec * 1000ms`
        }
      case TIME_U_SEC:
        return {
          title: this.#to(unit, TIME_U_SEC),
          body: `${TIME_U_SEC} = ${TIME_U_MIN} * 60sec`
        }
      case TIME_U_MIN:
        return super.notRequire()
      case TIME_U_HOUR:
        return {
          title: this.#to(unit, TIME_U_HOUR),
          body: `${TIME_U_HOUR} = ${TIME_U_MIN} / 60min`
        }
      case TIME_U_DAY:
        return {
          title: this.#to(unit, TIME_U_DAY),
          body: `${TIME_U_DAY} = ${TIME_U_MIN} / (60min * 24hour)`
        }
      default:
        return super.unknown()
    }
  }

  atHour (result) {
    const unit = `hour to`

    const min = '60min'
    const sec = `${min} * 60sec`
    const ms = `${sec} * 1000ms`
    const micro = `${sec} * 1000000μs`

    switch (TIME_SUB[result]) {
      case TIME_U_MICRO:
        return {
          title: this.#to(unit, TIME_U_MICRO),
          body: `${TIME_U_MICRO} = ${TIME_U_HOUR} * ${micro}`
        }
      case TIME_U_MS:
        return {
          title: this.#to(unit, TIME_U_MS),
          body: `${TIME_U_MS} = ${TIME_U_HOUR} * ${ms}`
        }
      case TIME_U_SEC:
        return {
          title: this.#to(unit, TIME_U_SEC),
          body: `${TIME_U_SEC} = ${TIME_U_HOUR} * ${sec}`
        }
      case TIME_U_MIN:
        return {
          title: this.#to(unit, TIME_U_MIN),
          body: `${TIME_U_MIN} = ${TIME_U_HOUR} * ${min}`
        }
      case TIME_U_HOUR:
        return super.notRequire()
      case TIME_U_DAY:
        return {
          title: this.#to(unit, TIME_U_DAY),
          body: `${TIME_U_DAY} = ${TIME_U_HOUR} / 24hour`
        }
      default:
        return super.unknown()
    }
  }

  atDay (result) {
    const unit = `day to`

    const hour = '24hour'
    const min = `${hour} * 60min`
    const sec = `${min} * 60sec`
    const ms = `${sec} * 1000ms`
    const micro = `${sec} * 1000000μs`

    switch (TIME_SUB[result]) {
      case TIME_U_MICRO:
        return {
          title: this.#to(unit, TIME_U_MICRO),
          body: `${TIME_U_MICRO} = ${TIME_U_DAY} * ${micro}`
        }
      case TIME_U_MS:
        return {
          title: this.#to(unit, TIME_U_MS),
          body: `${TIME_U_MS} = ${TIME_U_DAY} * ${ms}`
        }
      case TIME_U_SEC:
        return {
          title: this.#to(unit, TIME_U_SEC),
          body: `${TIME_U_SEC} = ${TIME_U_DAY} * ${sec}`
        }
      case TIME_U_MIN:
        return {
          title: this.#to(unit, TIME_U_MIN),
          body: `${TIME_U_MIN} = ${TIME_U_DAY} * ${min}`
        }
      case TIME_U_HOUR:
        return {
          title: this.#to(unit, TIME_U_HOUR),
          body: `${TIME_U_HOUR} = ${TIME_U_DAY} * ${hour}`
        }
      case TIME_U_DAY:
        return super.notRequire()
      default:
        return super.unknown()
    }
  }

  #to = (unit, str) => {
    switch (str) {
      case TIME_U_MICRO:
        return `${unit} microsecond:`
      case TIME_U_MS:
        return `${unit} millisecond:`
      case TIME_U_SEC:
        return `${unit} second:`
      case TIME_U_MIN:
        return `${unit} minute:`
      case TIME_U_HOUR:
        return `${unit} hour:`
      case TIME_U_DAY:
        return `${unit} day:`
      default:
        return null
    }
  }
}