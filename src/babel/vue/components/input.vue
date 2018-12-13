<template lang="pug">
  .input
    component(:is="device")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"
</style>

<script>
  import { isTouch, isPointer } from '../../modules/supported'
  import contentsInputTouch from './input-touch'
  import contentsInputMouse from './input-mouse'

  Vue.component('contents-input-touch', contentsInputTouch)
  Vue.component('contents-input-mouse', contentsInputMouse)

  export default {
    data () {
      return {
        device: isTouch || isPointer ? 'contents-input-touch' : 'contents-input-mouse'
      }
    }
  }
</script>
