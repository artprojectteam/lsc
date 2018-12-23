<template lang="pug">
  .display
    .display-number {{formatNumber}}
    .display-unit {{unit}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .display
    text-align: right
    &-number
      font-size: 2rem
      @media tablet
        font-size: 3rem
</style>

<script>
  import { mapState } from 'vuex'
  import { formatter } from '../../modules/formatter'

  export default {
    computed: {
      formatNumber () {
        return formatter(this.number)
      },

      unit () {
        return this.category[this.index]
      },

      ...mapState({
        number: (state) => state.display.numberStr,
        category: (state) => state.unit.category,
        index: (state) => state.unit.index
      })
    }
  }
</script>
