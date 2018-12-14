import { DISTANCE_SUB } from '../unit'
import Base from './Base'

export default class Distance extends Base {
  #idx = {}

  constructor () {
    super(DISTANCE_SUB)

    this.#idx = {
      mm: super.index('mm'),
      ms: super.index('cm'),
      m: super.index('m'),
      km: super.index('km'),
      mile: super.index('mile'),
      yard: super.index('yard'),
      foot: super.index('foot'),
      inch: super.index('inch'),
      knot: super.index('knot')
    }
  }
}