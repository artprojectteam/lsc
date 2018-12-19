import {
  DISTANCE_SUB,
  DISTANCE_U_CM,
  DISTANCE_U_FOOT,
  DISTANCE_U_INCH,
  DISTANCE_U_KM,
  DISTANCE_U_M,
  DISTANCE_U_MILE,
  DISTANCE_U_MM,
  DISTANCE_U_NM,
  DISTANCE_U_YARD
} from '../unit'
import Base from './Base'

export default class Distance extends Base {
  #mile = '1609.344m'
  #yard = '0.9144m'
  #foot = '0.3048m'
  #inch = '25.4mm'
  #nm = '1.852km'

  atMm (result) {
    const unit = 'millimeter to'

    const m = `10mm * 1000cm`
    const km = `${m} * 1000m`

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return super.notRequire()
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x / 10mm`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x / (${m})`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x / (${km})`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x / (${m} * ${this.#mile})`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x / (${m} * ${this.#yard})`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x / (${m} * ${this.#foot})`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x / ${this.#inch}`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x / (${km} * ${this.#nm})`
        }
      default:
        return super.unknown()
    }
  }

  atCm (result) {
    const unit = 'centimeter to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm`
        }
      case DISTANCE_U_CM:
        return super.notRequire()
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x / 100cm`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x / (100cm * 1000m)`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x / (100cm * ${this.#mile})`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x / (100cm * ${this.#yard})`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x / (100cm * ${this.#foot})`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x / (${this.#inch} / 10mm)`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x / (100cm * 1000m * ${this.#nm})`
        }
      default:
        return super.unknown()
    }
  }

  atM (result) {
    const unit = 'meter to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm * 100cm`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * 100cm`
        }
      case DISTANCE_U_M:
        return super.notRequire()
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x / 1000m`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x / ${this.#mile}`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x / ${this.#yard}`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x / ${this.#foot}`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x / (${this.#inch} / (10mm * 100cm) )`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x / (${this.#nm} * 1000m)`
        }
      default:
        return super.unknown()
    }
  }

  atKm (result) {
    const unit = 'kilometer to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm * 100cm * 1000m`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * 100cm * 1000m`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x * 1000m`
        }
      case DISTANCE_U_KM:
        return super.notRequire()
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x / (${this.#mile} / 1000m)`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x / (${this.#yard} / 1000m)`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x / (${this.#foot} / 1000m)`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x / (${this.#inch} / (10mm * 100cm * 1000m))`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x / ${this.#nm}`
        }
      default:
        return super.unknown()
    }
  }

  atMile (result) {
    const unit = 'mile to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm * 100cm * ${this.#mile}`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * 100cm * ${this.#mile}`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x * ${this.#mile}`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x * (${this.#mile} / 1000m)`
        }
      case DISTANCE_U_MILE:
        return super.notRequire()
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x * (${this.#mile} / ${this.#yard})`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x * (${this.#mile} / ${this.#foot})`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x * ( (${this.#mile} * 10mm * 100cm) / ${this.#inch} )`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x * ( (${this.#mile} / (10mm * 100cm) ) / ${this.#nm} )`
        }
      default:
        return super.unknown()
    }
  }

  atYard (result) {
    const unit = 'yard to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm * 100cm * ${this.#yard}`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * 100cm * ${this.#yard}`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x * ${this.#yard}`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x (${this.#yard} / 1000m)`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x * (${this.#yard} / ${this.#mile})`
        }
      case DISTANCE_U_YARD:
        return super.notRequire()
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x * 3foot`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x * ( (10mm * 100cm * ${this.#yard}) / ${this.#inch} )`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x * ( (${this.#yard} / (10mm * 100cm) ) / ${this.#nm} )`
        }
      default:
        return super.unknown()
    }
  }

  atFoot (result) {
    const unit = 'foot to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm * 100cm * ${this.#foot}`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * 100cm * ${this.#foot}`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x * ${this.#foot}`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x * (${this.#foot} / 1000m)`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x * (${this.#foot} / ${this.#mile})`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x / 3foot`
        }
      case DISTANCE_U_FOOT:
        return super.notRequire()
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x * ( (10mm * 100cm * ${this.#foot}) / ${this.#inch} )`
        }
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x * ( (${this.#foot} / 1000m) / ${this.#nm} )`
        }
      default:
        return super.unknown()
    }
  }

  atInch (result) {
    const unit = 'inch to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * ${this.#inch}`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * (${this.#inch} / 10mm)`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x * (${this.#inch} / (10mm * 100cm))`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x * (${this.#inch} / (10mm * 100cm * 1000m) )`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x * (${this.#inch} / (10mm * 100cm * ${this.#mile}) )`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x  * (${this.#inch} / (10mm * 100cm * ${this.#yard}) )`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x  * (${this.#inch} / (10mm * 100cm * ${this.#foot}) )`
        }
      case DISTANCE_U_INCH:
        return super.notRequire()
      case DISTANCE_U_NM:
        return {
          title: this.#to(unit, DISTANCE_U_NM),
          body: `${DISTANCE_U_NM} = x * (${this.#inch} / (10mm * 100cm * 1000m * ${this.#nm}) )`
        }
      default:
        return super.unknown()
    }
  }

  atNm (result) {
    const unit = ' nautical mile to'

    switch (DISTANCE_SUB[result]) {
      case DISTANCE_U_MM:
        return {
          title: this.#to(unit, DISTANCE_U_MM),
          body: `${DISTANCE_U_MM} = x * 10mm * 100cm * 1000m * ${this.#nm}`
        }
      case DISTANCE_U_CM:
        return {
          title: this.#to(unit, DISTANCE_U_CM),
          body: `${DISTANCE_U_CM} = x * 100cm * 1000m * ${this.#nm}`
        }
      case DISTANCE_U_M:
        return {
          title: this.#to(unit, DISTANCE_U_M),
          body: `${DISTANCE_U_M} = x * 1000m * ${this.#nm}`
        }
      case DISTANCE_U_KM:
        return {
          title: this.#to(unit, DISTANCE_U_KM),
          body: `${DISTANCE_U_KM} = x * ${this.#nm}`
        }
      case DISTANCE_U_MILE:
        return {
          title: this.#to(unit, DISTANCE_U_MILE),
          body: `${DISTANCE_U_MILE} = x * ( (1000m * ${this.#nm}) / ${this.#mile} )`
        }
      case DISTANCE_U_YARD:
        return {
          title: this.#to(unit, DISTANCE_U_YARD),
          body: `${DISTANCE_U_YARD} = x * ( (1000m * ${this.#nm}) / ${this.#yard} )`
        }
      case DISTANCE_U_FOOT:
        return {
          title: this.#to(unit, DISTANCE_U_FOOT),
          body: `${DISTANCE_U_FOOT} = x * ( (1000m * ${this.#nm}) / ${this.#foot} )`
        }
      case DISTANCE_U_INCH:
        return {
          title: this.#to(unit, DISTANCE_U_INCH),
          body: `${DISTANCE_U_INCH} = x * ( (10mm * 100cm * 1000m * ${this.#nm}) / ${this.#inch} )`
        }
      case DISTANCE_U_NM:
        return super.notRequire()
      default:
        return super.unknown()
    }
  }

  #to = (unit, str) => {
    switch (str) {
      case DISTANCE_U_MM:
        return `${unit} millimeter:`
      case DISTANCE_U_CM:
        return `${unit} centimeter:`
      case DISTANCE_U_M:
        return `${unit} meter:`
      case DISTANCE_U_KM:
        return `${unit} kilometer:`
      case DISTANCE_U_MILE:
        return `${unit} mile:`
      case DISTANCE_U_YARD:
        return `${unit} yard:`
      case DISTANCE_U_FOOT:
        return `${unit} foot:`
      case DISTANCE_U_INCH:
        return `${unit} inch:`
      case DISTANCE_U_NM:
        return `${unit} nautical mile:`
      default:
        return null
    }
  }
}