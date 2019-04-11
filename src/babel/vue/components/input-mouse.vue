<template lang="pug">
  .inputMouse
    input#input-area.inputMouse-area(ref="inputMouse", type="number", v-model.trim="inputs")
    .inputMouse-warning(v-if="warning") {{warning}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .inputMouse
    &-area
      width: 100%
      border: 2px solid color-main
      padding: 5px
      text-align: right
      font-size: (fz-tablet + 0.8rem)

      &:focus
        outline: none
        background: lighten(color-main, 80%)

    &-warning
      padding-top: space-mobile
      text-align: right
      color: color-red
      @media tablet
        padding-top: space-tablet
</style>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        warning: null
      }
    },
    computed: {
      inputs: {
        get () {
          return this.numberStr
        },
        async set (val) {
          this.warning = await this.update({
            val: val !== '' ? val : '0'
          })

          if (this.warning) this.$refs['inputMouse'].blur()
        }
      },
      ...mapState({
        numberStr: (state) => state.display.numberStr
      })
    },
    methods: {
      ...mapActions({
        update: 'display/update'
      })
    }
  }
</script>