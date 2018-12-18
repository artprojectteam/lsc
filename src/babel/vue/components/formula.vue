<template lang="pug">
  .formula
    h2.formula-title FORMULA

    .formula-code code area
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .formula
    &-title
      font-size: 2rem
      margin-bottom: space-mobile
      @media tablet
        font-size: 2.6rem
        margin-bottom: space-tablet

    &-code
      background: #666666
      color: #ffffff
      padding: space-mobile
      @media tablet
        padding: space-tablet
</style>

<script>
  export default {}
</script>