import { TRANSFER_BYTE, TRANSFER_GB, TRANSFER_KB, TRANSFER_MB, TRANSFER_PB, TRANSFER_SUB, TRANSFER_TB } from '../unit'
import Base from './Base'

export default class Transfer extends Base {
  #u = 1024

  atByte (result) {
    const unit = 'byte to'

    switch (TRANSFER_SUB[result]) {
      case TRANSFER_BYTE:
        return super.notRequire()
      case TRANSFER_KB:
        return {
          title: this.#to(unit, TRANSFER_KB),
          body: `${TRANSFER_KB} = x / ${this.#u} ${TRANSFER_BYTE}`
        }
      case TRANSFER_MB:
        return {
          title: this.#to(unit, TRANSFER_MB),
          body: `${TRANSFER_MB} = x / ${this.#u}<sup>2</sup> ${TRANSFER_BYTE}`
        }
      case TRANSFER_GB:
        return {
          title: this.#to(unit, TRANSFER_GB),
          body: `${TRANSFER_GB} = x / ${this.#u}<sup>3</sup> ${TRANSFER_BYTE}`
        }
      case TRANSFER_TB:
        return {
          title: this.#to(unit, TRANSFER_TB),
          body: `${TRANSFER_TB} = x / ${this.#u}<sup>4</sup> ${TRANSFER_BYTE}`
        }
      case TRANSFER_PB:
        return {
          title: this.#to(unit, TRANSFER_PB),
          body: `${TRANSFER_PB} = x / ${this.#u}<sup>5</sup> ${TRANSFER_BYTE}`
        }
      default:
        return super.unknown()
    }
  }

  atKB (result) {
    const unit = 'kilobyte to'

    switch (TRANSFER_SUB[result]) {
      case TRANSFER_BYTE:
        return {
          title: this.#to(unit, TRANSFER_BYTE),
          body: `${TRANSFER_BYTE} = x * ${this.#u + TRANSFER_KB}`
        }
      case TRANSFER_KB:
        return super.notRequire()
      case TRANSFER_MB:
        return {
          title: this.#to(unit, TRANSFER_MB),
          body: `${TRANSFER_MB} = x / ${this.#u + TRANSFER_KB}`
        }
      case TRANSFER_GB:
        return {
          title: this.#to(unit, TRANSFER_GB),
          body: `${TRANSFER_GB} = x / ${this.#u}<sup>2</sup> ${TRANSFER_KB}`
        }
      case TRANSFER_TB:
        return {
          title: this.#to(unit, TRANSFER_TB),
          body: `${TRANSFER_TB} = x / ${this.#u}<sup>3</sup> ${TRANSFER_KB}`
        }
      case TRANSFER_PB:
        return {
          title: this.#to(unit, TRANSFER_PB),
          body: `${TRANSFER_PB} = x / ${this.#u}<sup>4</sup> ${TRANSFER_KB}`
        }
      default:
        return super.unknown()
    }
  }

  atMB (result) {
    const unit = 'megabyte to'

    switch (TRANSFER_SUB[result]) {
      case TRANSFER_BYTE:
        return {
          title: this.#to(unit, TRANSFER_BYTE),
          body: `${TRANSFER_BYTE} = x * ${this.#u}<sup>2</sup> ${TRANSFER_MB}`
        }
      case TRANSFER_KB:
        return {
          title: this.#to(unit, TRANSFER_KB),
          body: `${TRANSFER_KB} = x * ${this.#u + TRANSFER_MB}`
        }
      case TRANSFER_MB:
        return super.notRequire()
      case TRANSFER_GB:
        return {
          title: this.#to(unit, TRANSFER_GB),
          body: `${TRANSFER_GB} = x / ${this.#u + TRANSFER_MB}`
        }
      case TRANSFER_TB:
        return {
          title: this.#to(unit, TRANSFER_TB),
          body: `${TRANSFER_TB} = x / ${this.#u}<sup>2</sup> ${TRANSFER_MB}`
        }
      case TRANSFER_PB:
        return {
          title: this.#to(unit, TRANSFER_PB),
          body: `${TRANSFER_PB} = x / ${this.#u}<sup>3</sup> ${TRANSFER_MB}`
        }
      default:
        return super.unknown()
    }
  }

  atGB (result) {
    const unit = 'gigabyte to'

    switch (TRANSFER_SUB[result]) {
      case TRANSFER_BYTE:
        return {
          title: this.#to(unit, TRANSFER_BYTE),
          body: `${TRANSFER_BYTE} = x * ${this.#u}<sup>3</sup> ${TRANSFER_GB}`
        }
      case TRANSFER_KB:
        return {
          title: this.#to(unit, TRANSFER_KB),
          body: `${TRANSFER_KB} = x * ${this.#u}<sup>2</sup> ${TRANSFER_GB}`
        }
      case TRANSFER_MB:
        return {
          title: this.#to(unit, TRANSFER_MB),
          body: `${TRANSFER_MB} = x * ${this.#u + TRANSFER_GB}`
        }
      case TRANSFER_GB:
        return super.notRequire()
      case TRANSFER_TB:
        return {
          title: this.#to(unit, TRANSFER_TB),
          body: `${TRANSFER_TB} = x / ${this.#u + TRANSFER_GB}`
        }
      case TRANSFER_PB:
        return {
          title: this.#to(unit, TRANSFER_PB),
          body: `${TRANSFER_PB} = x / ${this.#u}<sup>2</sup> ${TRANSFER_GB}`
        }
      default:
        return super.unknown()
    }
  }

  atTB (result) {
    const unit = 'terabyte to'

    switch (TRANSFER_SUB[result]) {
      case TRANSFER_BYTE:
        return {
          title: this.#to(unit, TRANSFER_BYTE),
          body: `${TRANSFER_BYTE} = x * ${this.#u}<sup>4</sup> ${TRANSFER_TB}`
        }
      case TRANSFER_KB:
        return {
          title: this.#to(unit, TRANSFER_KB),
          body: `${TRANSFER_KB} = x * ${this.#u}<sup>3</sup> ${TRANSFER_TB}`
        }
      case TRANSFER_MB:
        return {
          title: this.#to(unit, TRANSFER_MB),
          body: `${TRANSFER_MB} = x * ${this.#u}<sup>2</sup> ${TRANSFER_TB}`
        }
      case TRANSFER_GB:
        return {
          title: this.#to(unit, TRANSFER_GB),
          body: `${TRANSFER_GB} = x * ${this.#u + TRANSFER_TB}`
        }
      case TRANSFER_TB:
        return super.notRequire()
      case TRANSFER_PB:
        return {
          title: this.#to(unit, TRANSFER_PB),
          body: `${TRANSFER_PB} = x / ${this.#u + TRANSFER_TB}`
        }
      default:
        return super.unknown()
    }
  }

  atPB (result) {
    const unit = 'petabyte to'

    switch (TRANSFER_SUB[result]) {
      case TRANSFER_BYTE:
        return {
          title: this.#to(unit, TRANSFER_BYTE),
          body: `${TRANSFER_BYTE} = x * ${this.#u}<sup>5</sup> ${TRANSFER_PB}`
        }
      case TRANSFER_KB:
        return {
          title: this.#to(unit, TRANSFER_KB),
          body: `${TRANSFER_KB} = x * ${this.#u}<sup>4</sup> ${TRANSFER_PB}`
        }
      case TRANSFER_MB:
        return {
          title: this.#to(unit, TRANSFER_MB),
          body: `${TRANSFER_MB} = x * ${this.#u}<sup>3</sup> ${TRANSFER_PB}`
        }
      case TRANSFER_GB:
        return {
          title: this.#to(unit, TRANSFER_GB),
          body: `${TRANSFER_GB} = x * ${this.#u}<sup>2</sup> ${TRANSFER_PB}`
        }
      case TRANSFER_TB:
        return {
          title: this.#to(unit, TRANSFER_TB),
          body: `${TRANSFER_TB} = x * ${this.#u + TRANSFER_PB}`
        }
      case TRANSFER_PB:
        return super.notRequire()
      default:
        return super.unknown()
    }
  }

  #to = (unit, str) => {
    switch (str) {
      case TRANSFER_BYTE:
        return `${unit}:`
      case TRANSFER_KB:
        return `${unit} kilobyte:`
      case TRANSFER_MB:
        return `${unit} megabyte:`
      case TRANSFER_GB:
        return `${unit} gigabyte:`
      case TRANSFER_TB:
        return `${unit} terabyte:`
      case TRANSFER_PB:
        return `${unit} petabyte:`
      default:
        return null
    }
  }
}