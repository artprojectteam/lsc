<template lang="pug">
  .result
    .result-area
      .result-active(ref="r-select")

      .result-container(ref="r-container")
        ul.result-box(ref="r-box")
          li(v-for="val in list", :key="val.unit") {{val.number}}<br>{{val.unit}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  $h_mb = 40px
  $h_tab = 60px

  .result
    &-area
      height: 200px
      background: rgba(#fff, 0.9)
      position: relative
      z-index: zi-main
      @media tablet
        height: 400px

    &-active
      position: absolute
      top: (80px - 2px)
      left: -2px
      width: calc(100% - 4px)
      height: $h_mb
      border: 4px solid color-main
      box-sizing: content-box
      z-index: (zi-main + 1)
      pointer-events: none
      @media tablet
        width: calc(100% - 6px)
        height: $h_tab
        top: (170px - 2px)
        left: -3px
        border: 6px solid color-main

    &-container
      width: 100%
      height: 100%
      overflow: hidden
      border: 2px solid color-active
      @media tablet
        border: 4px solid color-active

    &-box
      list-style: none
      padding: 80px 0
      margin: 0
      @media tablet
        padding: 170px 0

      li
        height: $h_mb
        background: #fff
        border-bottom: 1px solid #cccccc

        &:first-child
          border-top: @border-bottom
        @media tablet
          height: $h_tab
</style>

<script>
  import { mapState } from 'vuex'
  import Scroll from '../../modules/Scroll'
  import CalcWorker from '../../worker/calc.worker'
  import { formatter } from '../../modules/formatter'

  export default {
    data () {
      return {
        worker: null,
        list: [],
        scroll: null,
        changeNumber: false
      }
    },
    computed: {
      ...mapState({
        current: (state) => state.unit.current,
        index: (state) => state.unit.index,
        category: (state) => state.unit.category,
        number: (state) => state.display.numberStr
      })
    },
    mounted () {
      this.calc()

      window.addEventListener('resize', () => {
        if (this.scroll != null) this.scrollUpdate()
      }, false)

      this.$store.watch((state) => [state.unit.current, state.unit.index, this.number], (n, o) => {
        // change number ?
        this.changeNumber = n[2] !== o[2]

        this.calc()
      })
    },
    methods: {
      calc () {
        // TODO: 計算している間の演出

        if (this.worker != null) {
          this.worker.terminate()
          this.worker = null
        }
        this.worker = new CalcWorker()

        this.worker.addEventListener('message', (e) => {
          this.worker = null
          this.format(e.data)
        }, false)

        this.worker.postMessage({
          current: this.current,
          index: this.index,
          number: Number(this.number)
        })
      },

      format (result) {
        // TODO: 計算ができなかった場合

        this.list = []
        this.category.forEach((item, i) => {
          this.list.push({
            number: formatter(result[i].toString(10)),
            unit: item
          })
        })
      },

      scrollUpdate () {
        const container = this.$refs['r-container']
        const box = this.$refs['r-box']
        const select = this.$refs['r-select']

        this.scroll.update(container, box, select)
        return this.scroll
      }
    },
    watch: {
      list: {
        // 変更時にスクロールイベントを生成
        handler (n, o) {
          if (this.scroll == null) {
            this.scroll = new Scroll()
          }

          if (this.changeNumber) return false

          this.scroll.deactivate()

          this.$nextTick(() => {
            const scroll = this.scrollUpdate()
            scroll.activate()
          })
        },
        deep: true
      }
    }
  }
</script>