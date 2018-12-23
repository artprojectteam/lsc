<template lang="pug">
  .inputTouch(ref="inputTouch")
    .inputTouch-area(v-for="obj in inputArray", :key="obj.val", :class="'num-'+obj.val", @touchstart.stop="scaleOut($event.target)", @touchend.stop="scaleIn($event.target)", @click="createNumber(obj.val)")
      button.inputBtn(type="button")
        template(v-if="obj.val === 'del'")
          img.icon-del(src="../../../img/icon_del.svg", alt="")
        template(v-else) {{obj.display}}
    .inputTouch-area.num-none &nbsp;
    .inputTouch-warning(ref="warning"): .warning {{warning}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .inputTouch
    display: grid
    grid-template-columns: repeat(3, 1fr) 20%
    grid-template-rows: repeat(4, 45px)
    grid-gap: 1px
    background: black
    border: 1px solid black
    width: 100%
    position: relative
    @media tablet
      grid-template-rows: repeat(4, 70px)

    &-warning
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 100%
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      opacity: 0
      visibility: hidden
      pointer-events: none

  .warning
    display: inline-block
    vertical-align: middle
    background: color-red
    color: #ffffff
    width: 80%
    padding: space-mobile
    text-align: center

  .inputBtn
    background: #ffffff
    width: 100%
    height: 100%
    cursor: pointer
    border: none
    font-size: 2.4rem
    padding: 0
    touch-action: manipulation
    user-select: none

    &:focus
      outline: none

  .icon-del
    vertical-align: middle
    @media tablet
      transform: scale(1.2)

  .num
    &-\0
      grid-column: 1 / 3
      grid-row: 4 / 5

    &-\1
      grid-column: 1 / 2
      grid-row: 3 / 4

    &-\2
      grid-column: 2 / 3
      grid-row: 3 / 4

    &-\3
      grid-column: 3 / 4
      grid-row: 3 / 4

    &-\4
      grid-column: 1 / 2
      grid-row: 2 / 3

    &-\5
      grid-column: 2 / 3
      grid-row: 2 / 3

    &-\6
      grid-column: 3 / 4
      grid-row: 2 / 3

    &-\7
      grid-column: 1 / 2
      grid-row: 1 / 2

    &-\8
      grid-column: 2 / 3
      grid-row: 1 / 2

    &-\9
      grid-column: 3 / 4
      grid-row: 1 / 2

    &-comma
      grid-column: 3 / 4
      grid-row: 4 / 5

    &-ac
      grid-column: 4 / 5
      grid-row: 1 / 2

    &-del
      grid-column: 4 / 5
      grid-row: 2 / 3

    &-none
      grid-column: 4 / 5
      grid-row: 3 / 5
      background: #ffffff
</style>

<script>
  import animejs from 'animejs'
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        animation: null,
        warning: null
      }
    },

    computed: {
      inputArray () {
        return [
          { val: 0, display: 0 },
          { val: 1, display: 1 },
          { val: 2, display: 2 },
          { val: 3, display: 3 },
          { val: 4, display: 4 },
          { val: 5, display: 5 },
          { val: 6, display: 6 },
          { val: 7, display: 7 },
          { val: 8, display: 8 },
          { val: 9, display: 9 },
          { val: 'dot', display: '.' },
          { val: 'ac', display: 'AC' },
          { val: 'del', display: '' }
        ]
      },
      ...mapState({
        numberStr: (state) => state.display.numberStr
      })
    },

    mounted () {
    },

    methods: {
      async createNumber (val) {
        switch (val) {
          case 'dot':
            // すでにドットが存在している場合処理しない
            if (/[.]/.test(this.numberStr)) return false

            this.update({
              val: `${this.numberStr}.`
            })
            return false
          case 'ac':
            this.update({ val: '0' })
            return false
          case 'del':
            if (this.numberStr === '0') return false

            const number = this.numberStr.slice(0, -1)
            this.update({ val: number || '0' })
            return false
          default:
            if (/[0-9]/.test(val) === false) return false

            const res = await this.update({
              val: this.numberStr + val
            })

            this.warning = res

            if (res != null) {
              const warning = this.$refs['warning']
              warning.style.visibility = 'visible'

              const parent = this.$refs['inputTouch']
              parent.style.pointerEvents = 'none'

              animejs({
                targets: warning,
                opacity: [
                  { value: 1, duration: 300, elasticity: 0 },
                  { value: 0, duration: 300, elasticity: 0 }
                ],
                scale: [
                  { value: 0.5, duration: 0 },
                  { value: 1.1, duration: 700, elasticity: 0 }
                ],
                complete: () => {
                  warning.removeAttribute('style')
                  parent.removeAttribute('style')
                }
              })
            }

            return false
        }
      },

      scaleOut (target) {
        this.animation = animejs({
          targets: target,
          scale: 0.8,
          duration: 100,
          easing: 'linear'
        })
      },

      scaleIn (target) {
        if (this.animation) this.animation.pause()

        this.animation = animejs({
          targets: target,
          scale: 1,
          duration: 100,
          easing: 'linear',
          complete: () => {
            this.animation = null
          }
        })
      },

      ...mapActions({
        update: 'display/update'
      })
    }
  }
</script>