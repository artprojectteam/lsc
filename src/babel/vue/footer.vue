<template lang="pug">
  footer.footer
    .footer-conteainer footer
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .footer
    background: #eeeeee
    safe-area('bottom')
    safe-area('left')
    safe-area('right')

    &-container
      @media mobile
        space-mobile-side()
</style>

<script>
  export default {}
</script>