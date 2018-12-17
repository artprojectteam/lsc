<template lang="pug">
  .result
    .result-area
      .result-active

      .result-wrapper
        ul.result-content
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
      @media tablet
        width: calc(100% - 6px)
        height: $h_tab
        top: (170px - 2px)
        left: -3px
        border: 6px solid color-main

    &-wrapper
      width: 100%
      height: 100%
      overflow: hidden
      border: 2px solid color-active
      @media tablet
        border: 4px solid color-active

    &-content
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
  import CalcWorker from '../../worker/calc.worker'
  import { formatter } from '../../modules/formatter'

  export default {
    data () {
      return {
        worker: null,
        list: [],
        scroll: null
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

      this.$store.watch((state) => [state.unit.current, state.unit.index, this.number], (n, o) => {
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
          number: parseInt(this.number, 10)
        })
      },

      format (result) {
        // TODO: 計算ができなかった場合

        this.list = []
        console.log(result)

        this.category.forEach((item, i) => {
          this.list.push({
            number: formatter(result[i].toString(10)),
            unit: item
          })
        })

        // TODO: スクロールイベントを生成
      }
    }
  }
</script>