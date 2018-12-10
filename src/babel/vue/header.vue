<template lang="pug">
  header.header
    .header-container header
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .header
    background: #eeeeee
    safe-area('top')
    safe-area('left')
    safe-area('right')

    &-container
      @media mobile
        space-mobile-side()
</style>

<script>
  export default {}
</script>