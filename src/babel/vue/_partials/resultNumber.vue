<template lang="pug">
  .result
    .container result

    .copy: button.btn.copy(type="button") COPY
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .container
    height: 200px
    width: 100%
    border: 1px solid color-blue
    @media mobile
      margin-bottom: space-mobile
      height: 200px
</style>

<script>
  export default {}
</script>