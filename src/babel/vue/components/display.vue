<template lang="pug">
  .display {{number}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .display
    background: #eeeeee
    height: 30px
</style>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        number: (state) => state.display.numberStr
      })
    }
  }
</script>
