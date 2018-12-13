<template lang="pug">
  .code
    .code-sec
      p: v-button.code-button(color="gray", value="preview code", no-cursor=true)
      p: v-button.code-button(color="green", value="preview code 2", @click="onClick")
    .code-sec: code-area
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .code
    display: grid
    grid-gap: space-mobile
    grid-template-rows: auto 1fr
    grid-auto-rows: auto
    @media tablet
      grid-gap: space-tablet
      grid-template-rows: 1fr
      grid-template-columns: 0.33fr 0.67fr
    @media desktop
      grid-template-columns: 0.22fr 0.78fr

    &-button
      width: 100%
      height: 50px
      @media tablet
        height: 60px
</style>

<script>
  import codeArea from './code-area'

  export default {
    components: { codeArea },
    methods: {
      onClick () {
        console.log('click')
      }
    }
  }
</script>