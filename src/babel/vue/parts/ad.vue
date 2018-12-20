<template lang="pug">
  .ad
    ins.adsbygoogle(:class="{'lsc-1': cLsc1, 'lsc-2': cLsc2}", :style="adStyle", :data-ad-client="adClient", :data-ad-slot="adSlot", :data-ad-format="adFormat", :data-full-width-responsive="adResponsive")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"
  .ad
    width: 100%
    text-align: center
    position: relative

  // Google Main ad
  .lsc-1
    width: 320px
    height: 100px
    @media screen and (min-width: 500px)
      width: 468px
      height: 60px
    @media tablet
      width: 728px
      height: 90px

  // Google Sub ad
  .lsc-2
    display: inline-block
    text-align: center
    width: 100%
    @media mobile
      display: none
</style>

<script>
  export default {
    props: {
      cLsc1: {
        type: Boolean,
        required: false,
        default: false
      },
      cLsc2: {
        type: Boolean,
        required: false,
        default: false
      },
      adClient: {
        type: String,
        required: true
      },
      adSlot: {
        type: String,
        required: true
      },
      adFormat: {
        type: String,
        required: false
      },
      adStyle: {
        type: String,
        required: false
      },
      adResponsive: {
        type: String,
        required: false
      }
    },
    mounted () {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }
</script>