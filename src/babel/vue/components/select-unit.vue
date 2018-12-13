<template lang="pug">
  .selectUnit
    p select unit
    //-v-button(color="blue", value="abc", @click="cl('abf', 'hgn')")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .selectUnit
    background: #eeeeee
    height: 40px
</style>

<script>
  export default {
    methods: {
      cl (v, a) {
        console.log(v, a)
      }
    }
  }
</script>