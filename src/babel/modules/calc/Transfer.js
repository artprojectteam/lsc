import { TRANSFER_BYTE, TRANSFER_GB, TRANSFER_KB, TRANSFER_MB, TRANSFER_PB, TRANSFER_SUB, TRANSFER_TB } from '../unit'
import Base from './Base'

export default class Transfer extends Base {
  #idx = {}

  constructor () {
    super(TRANSFER_SUB)

    this.#idx = {
      byte: super.index(TRANSFER_BYTE),
      kb: super.index(TRANSFER_KB),
      mb: super.index(TRANSFER_MB),
      gb: super.index(TRANSFER_GB),
      tb: super.index(TRANSFER_TB),
      pb: super.index(TRANSFER_PB)
    }
  }

  selectByte (number) {
    super.input(number)
    let result = []

    result[this.#idx.byte] = number
    result[this.#idx.kb] = super.quotient(1024)
    result[this.#idx.mb] = super.quotient(1024 ** 2)
    result[this.#idx.gb] = super.quotient(1204 ** 3)
    result[this.#idx.tb] = super.quotient(1024 ** 4)
    result[this.#idx.pb] = super.quotient(1024 ** 5)

    return result
  }

  selectKB (number) {
    super.input(number)
    let result = []

    result[this.#idx.byte] = super.product(1024)
    result[this.#idx.kb] = number
    result[this.#idx.mb] = super.quotient(1024)
    result[this.#idx.gb] = super.quotient(1024 ** 2)
    result[this.#idx.tb] = super.quotient(1024 ** 3)
    result[this.#idx.pb] = super.quotient(1024 ** 4)

    return result
  }

  selectMB (number) {
    super.input(number)
    let result = []

    result[this.#idx.byte] = super.product(1024 ** 2)
    result[this.#idx.kb] = super.product(1024)
    result[this.#idx.mb] = number
    result[this.#idx.gb] = super.quotient(1024)
    result[this.#idx.tb] = super.quotient(1024 ** 2)
    result[this.#idx.pb] = super.quotient(1024 ** 3)

    return result
  }

  selectGB (number) {
    super.input(number)
    let result = []

    result[this.#idx.byte] = super.product(1024 ** 3)
    result[this.#idx.kb] = super.product(1024 ** 2)
    result[this.#idx.mb] = super.product(1024)
    result[this.#idx.gb] = number
    result[this.#idx.tb] = super.quotient(1024)
    result[this.#idx.pb] = super.quotient(1024 ** 2)

    return result
  }

  selectTB (number) {
    super.input(number)
    let result = []

    result[this.#idx.byte] = super.product(1024 ** 4)
    result[this.#idx.kb] = super.product(1024 ** 3)
    result[this.#idx.mb] = super.product(1024 ** 2)
    result[this.#idx.gb] = super.product(1024)
    result[this.#idx.tb] = number
    result[this.#idx.pb] = super.quotient(1024)

    return result
  }

  selectPB (number) {
    super.input(number)
    let result = []

    result[this.#idx.byte] = super.product(1024 ** 5)
    result[this.#idx.kb] = super.product(1024 ** 4)
    result[this.#idx.mb] = super.product(1024 ** 3)
    result[this.#idx.gb] = super.product(1024 ** 2)
    result[this.#idx.tb] = super.product(1024)
    result[this.#idx.pb] = number

    return result
  }
}