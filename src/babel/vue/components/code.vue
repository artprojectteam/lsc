<template lang="pug">
  .code
    .code-sec: code-btn
    .code-sec: code-area
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .code
    display: grid
    grid-gap: space-mobile
    grid-template-rows: 40px 1fr
    grid-auto-rows: auto
    @media tablet
      grid-gap: space-tablet
      grid-template-rows: 1fr
      grid-template-columns: 0.33fr 0.67fr
    @media desktop
      grid-template-columns: 0.22fr 0.78fr
</style>

<script>
  import codeBtn from './code-btn'
  import codeArea from './code-area'

  export default {
    components: { codeBtn, codeArea }
  }
</script>