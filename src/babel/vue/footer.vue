<template lang="pug">
  .footer
    small.footer-copy &copy; arc-one
    ul.footer-list
      li: a.footer-link(href="https://github.com/artprojectteam/lsc/issues", target="_blank") Issue
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .footer
    display: flex
    align-items: center
    justify-content: space-between
    height: 100%

    &-copy
      font-size: fz-mobile
      @media tablet
        font-size: fz-tablet

    &-list
      display: flex
      align-items: center
      justify-content: space-around
      list-style: none
      margin: 0
      padding: 0
      li
        margin-left: space-mobile
        @media tablet
          margin-left: space-tablet

    &-link
      color: #ffffff
      text-decoration: underline

</style>

<script>
  export default {}
</script>