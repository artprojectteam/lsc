import { DEV, ONCE } from '../const'

const env = process.env

export const NODE_ENV = env.NODE_ENV || DEV
export const MODE = env.MODE || ONCE