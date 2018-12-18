
<template lang="pug">
  article
    .components.calc
      section.calc-display: contents-display
      section.calc-unit
        h2.title UNIT
        contents-select-unit
      section.calc-result
        h2.title RESULT
        contents-result

    .components.setting
      section.setting-unit
        h2.title CATEGORY
        contents-change-unit
      section.setting-input: contents-input
      section.setting-code: contents-formula

    aside.components.main-ad: contents-ad
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .components
    margin-bottom: (space-mobile * 2)
    &:last-child
      margin-bottom: 0
    @media tablet
      margin-bottom: (space-tablet * 2)

  .calc
    display: grid
    grid-gap: space-mobile
    grid-template-columns: repeat(3, 1fr)
    grid-auto-rows: auto
    @media tablet
      grid-template-columns: repeat(2, 1fr)
      grid-template-rows: auto 1fr
      grid-gap: space-tablet

    &-display
      grid-column: 1 / 4
      grid-row: 1 / 2
      background: rgba(lighten(color-active, 40%), 0.9)
      padding: space-mobile
      border-radius: 4px
      @media tablet
        grid-column: 1 / 2
        grid-row: 1 / 2

    &-unit
      grid-column: 1 / 2
      grid-row: 2 / 3
      @media tablet
        grid-column: 1 / 2
        grid-row: 2 / 3

    &-result
      grid-column: 2 / 4
      grid-row: 2 / 3
      @media tablet
        grid-column: 2 / 3
        grid-row: 1 / 3

  .setting
    display: grid
    grid-gap: (space-mobile * 2)
    grid-template-rows: auto auto
    @media tablet
      grid-gap: space-tablet
      grid-template-rows: auto
      grid-template-columns: 0.33fr 0.67fr

    &-unit
      @media tablet
        grid-column: 1 / 2
        grid-row: 1 / 3
    &-input
      @media tablet
        grid-column: 2 / 3
        grid-row: 1 / 2
    &-code
      @media tablet
        grid-column: 2 / 3
        grid-row: 2 / 3

  .main-ad
    width: 100%
    height: 40px
</style>

<script>
  import contentsDisplay from './components/display'
  import contentsSelectUnit from './components/select-unit'
  import contentsResult from './components/result'
  import contentsChangeUnit from './components/change-unit'
  import contentsInput from './components/input'
  import contentsAd from './components/ad'
  import contentsFormula from './components/formula'

  export default {
    components: {
      contentsAd,
      contentsDisplay,
      contentsSelectUnit,
      contentsResult,
      contentsChangeUnit,
      contentsInput,
      contentsFormula
    }
  }
</script>