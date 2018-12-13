<template lang="pug">
  .display
    .display-number {{formatNumber}}
    .display-unit TODO: unit
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

  export default {
    computed: {
      formatNumber () {
        let arr = this.number.split('.')

        let num = arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        if (arr[1] && arr[1].length > 0) {
          num += `.${arr[1]}`
        }

        return num
      },
      ...mapState({
        number: (state) => state.display.numberStr
      })
    }
  }
</script>
