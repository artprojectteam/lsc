<template lang="pug">
  .header
    h1: img.header-img(src="../../img/logo.svg", alt="LsC !")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .header
    display: flex
    align-items: center
    height: 100%
    &-img
      width: 104px
      @media tablet
        width: 147px
</style>

<script>
  export default {}
</script>