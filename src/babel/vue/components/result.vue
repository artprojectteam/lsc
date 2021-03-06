<template lang="pug">
  .result
    .result-area
      .result-active(ref="r-select")

      .result-container(ref="r-container")
        ul.result-box(ref="r-box")
          li(v-for="val in list", :key="val.unit")
            span.result-number {{val.number}}
            span.result-unit {{val.unit}}
          li(v-if="fail") calculation fail X(

    .result-button
      .result-button-area
        #result-copied.result-copied Copied !
        v-button.result-copy(color="orange", value="COPY", :is-active="fail || progress", @click="clipboard")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  $h_mb = 40px
  $h_tab = 60px

  .result
    &-area
      height: 200px
      background: rgba(lighten(color-active, 60%), 0.6)
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
        border-bottom: 1px solid color-active
        display: flex
        align-items: center
        justify-content: flex-end
        flex-flow: row wrap
        align-content: center
        text-align: right
        padding: 0 space-mobile

        &:first-child
          border-top: @border-bottom
        @media tablet
          height: $h_tab

    &-number
      display: block
      width: 100%
      @media tablet
        font-size: (fz-tablet + 0.2em)
    &-unit
      display: block
      width: 100%
      font-size: (fz-mobile - 0.2em)
      @media tablet
        font-size: (fz-tablet - 0.2em)

    &-button
      padding-top: space-mobile
      text-align: right
      display: grid
      grid-gap: space-mobile
      grid-template-columns: repeat(2, 1fr)
      z-index: zi-main
      @media tablet
        padding-top: space-tablet

      &-area
        grid-column: 2 / 3
        position: relative

    &-copied
      position: absolute
      width: 60px
      height: 30px
      display: flex
      flex-flow: row nowrap
      align-items: center
      justify-content: center
      background: rgba(#000000, 0.8)
      color: #ffffff
      text-align: center
      top: 0
      left: 0
      right: 0
      margin: auto
      z-index: zi-main + 1
      font-size: (fz-mobile - 0.2em)
      border-radius: 4px
      pointer-events: none
      opacity: 0
      @media tablet
        width: 80px
        height: 40px
        font-size: (fz-tablet - 0.2em)

    &-copy
      height: 40px
      width: 100%
      @media tablet
        height: 60px
</style>

<script>
  import animejs from 'animejs'
  import copy from 'clipboard-copy'
  import { mapActions, mapState } from 'vuex'
  import { formatter } from '../../modules/formatter'
  import Scroll from '../../modules/Scroll'
  import CalcWorker from '../../worker/calc.worker'

  export default {
    data () {
      return {
        worker: null,
        list: [],
        scroll: null,
        changeNumber: false,
        changeCategory: true,
        fail: false,
        progress: false
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
        if (this.scroll != null) this.scrollUpdate(true)
      }, false)

      this.$store.watch((state) => [state.unit.current, state.unit.index, state.display.numberStr], (n, o) => {
        this.changeNumber = n[2] !== o[2]
        this.changeCategory = n[0] !== o[0]

        this.calc()
      })
    },
    methods: {
      calc () {
        if (this.worker != null) {
          this.worker.terminate()
          this.worker = null
        }
        this.worker = new CalcWorker()
        this.progress = true

        this.worker.addEventListener('message', (e) => {
          this.worker = null
          this.format(e.data)
        }, { once: true, passive: true })

        this.worker.postMessage({
          category: this.current,
          index: this.index,
          number: Number(this.number)
        })
      },

      /**
       * コピー処理
       */
      clipboard () {
        const result = this.list[this.scroll.currentIndex()].origin
        copy(result)
          .then(() => {
            animejs({
              targets: '#result-copied',
              opacity: [
                { value: 0, duration: 0, elasticity: 0 },
                { value: 1, duration: 400, elasticity: 0 },
                { value: 0, duration: 400, elasticity: 0, delay: 200 }
              ],
              translateY: [
                { value: 0, duration: 0, elasticity: 0 },
                { value: '-20px', duration: 400, elasticity: 0 },
                { value: '-30px', duration: 400, elasticity: 0, delay: 200 }
              ]
            })
          })
          .catch(() => {})
      },

      /**
       * 数値表示の整形
       */
      format (result) {
        // 計算ができなかった場合
        if (result.length === 0) {
          this.fail = true
          return false
        }

        this.fail = false
        this.list = []
        this.category.forEach((item, i) => {
          this.list.push({
            number: formatter(result[i].toString(10)),
            origin: result[i],
            unit: item
          })
        })

        this.progress = false
      },

      /**
       * 要素位置のリセット
       * @param isResize
       * @return {null}
       */
      scrollUpdate (isResize = false) {
        const container = this.$refs['r-container']
        const box = this.$refs['r-box']
        const select = this.$refs['r-select']

        this.scroll.update(container, box, select, this.changeCategory, isResize)
        return this.scroll
      },

      ...mapActions({
        selectResultIndex: 'unit/selectResultIndex'
      })
    },
    watch: {
      list: {
        // 変更時にスクロールイベントを生成
        handler (n, o) {
          if (this.scroll == null) {
            this.scroll = new Scroll((index) => {
              this.selectResultIndex({ index })
            })
          }

          if (this.changeNumber) return false

          this.scroll.deactivate()

          this.$nextTick(() => {
            const scroll = this.scrollUpdate()
            this.selectResultIndex({ index: scroll.currentIndex() })
            scroll.activate()
          })
        },
        deep: true
      }
    }
  }
</script>