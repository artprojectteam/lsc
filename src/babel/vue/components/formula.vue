<template lang="pug">
  .formula
    h2.title FORMULA

    .formula-code code area
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .formula
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