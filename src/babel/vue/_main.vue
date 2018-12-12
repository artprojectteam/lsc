<template lang="pug">
  article.main
    .container
      display-number.mb

      .contents
        btn-unit
        result-number

    .container
      unit-list

    .container: input-area

    aside.container: ad

    .container: preview-code
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .container
    &:last-child
      margin-bottom: 0
    @media mobile
      margin-bottom: space-mobile

  .contents
    @media mobile
      display: grid
      grid-template-columns: repeat(2, 1fr)
      column-gap: space-mobile

  .mb
    @media mobile
      margin-bottom: space-mobile
</style>

<script>
  import displayNumber from './_partials/displayNumber'
  import btnUnit from './_partials/btnUnit'
  import resultNumber from './_partials/resultNumber'
  import unitList from './_partials/unitList'
  import ad from './_partials/ad'
  import inputArea from './_partials/inputArea'
  import previewCode from './_partials/previewCode'

  export default {
    components: {
      displayNumber,
      btnUnit,
      resultNumber,
      unitList,
      ad,
      inputArea,
      previewCode
    }
  }
</script>