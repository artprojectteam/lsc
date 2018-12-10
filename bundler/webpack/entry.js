import config from 'config'
import { babel } from './tasks/babel'
import { pug } from './tasks/pug'
import { stylus } from './tasks/stylus'
import { vue } from './tasks/vue'

const js = config.get('options.vue') ? vue : babel

export default [
  pug,
  stylus,
  js
]