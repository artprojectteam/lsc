import { WATCH } from '../const'
import Copy from '../modules/Copy'
import { MODE } from '../modules/Env'

const copy = new Copy()

if (MODE === WATCH) {
  copy.watch()
} else {
  copy.once()
}