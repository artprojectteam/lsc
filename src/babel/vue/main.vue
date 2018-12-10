<template lang="pug">
  article.main
    .container
      display-number.sec

      .contents
        btn-unit
        result-number

    .container
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .contents
    @media mobile
      display: grid
      grid-template-columns: repeat(2, 1fr)
      column-gap: space-mobile

  .sec
    @media mobile
      margin-bottom: space-mobile
</style>

<script>
  import displayNumber from './partials/displayNumber'
  import btnUnit from './partials/btnUnit'
  import resultNumber from './partials/resultNumber'

  export default {
    components: {
      displayNumber,
      btnUnit,
      resultNumber
    }
  }
</script>