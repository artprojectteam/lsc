<template lang="pug">
  .formula
    h2.title FORMULA

    .formula-code(v-if="str.body")
      h3.formula-title(v-if="str.title") {{str.title}}
      p.formula-str {{str.body}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  $pd_mb = floor(space-mobile / 3)

  .formula
    &-code
      background: #666666
      color: #ffffff
      list-style: none
      margin: 0
      padding: (space-mobile / 2)
      @media tablet
        padding: (space-tablet / 2)

    &-title
      font-size: (fz-mobile - 0.2rem)
      margin-bottom: (space-mobile / 2)
      color: color-point
      @media tablet
        font-size: (fz-tablet - 0.2rem)
        margin-bottom: (space-tablet / 2)

    &-str
      margin: 0
      line-height: 1.3
      font-size: (fz-mobile + 0.3rem)
      @media tablet
        font-size: (fz-tablet + 0.3rem)

    &-list
      display: flex
      width: 100%
      flex-flow: row nowrap
      line-height: 1.3

    &-no
      counter-increment: count
      width: 40px
      background: #969696
      text-align: center
      padding: $pd_mb

      &::before
        content: counter(count)

    &-value
      padding: $pd_mb
</style>

<script>
  import FormulaWorker from '../../worker/formula.worker'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        worker: null,
        list: [],
        str: { title: null, body: null }
      }
    },
    computed: {
      ...mapState({
        current: (state) => state.unit.current,
        index: (state) => state.unit.index,
        result: (state) => state.unit.result
      })
    },
    mounted () {
      this.formula()

      this.$store.watch((state) => [state.unit.current, state.unit.index, state.unit.category, state.unit.result],
        (n, o) => {
          this.formula()
          // console.log('formula', n, o)
        })
    },
    methods: {
      formula () {
        if (this.worker != null) {
          this.worker.terminate()
          this.worker = null
        }

        this.worker = new FormulaWorker()

        this.worker.addEventListener('message', (e) => {
          this.worker = null
          this.str = e.data
        }, { once: true, passive: true })

        this.worker.postMessage({
          category: this.current,
          unit: this.index,
          result: this.result
        })
      }
    }
  }
</script>