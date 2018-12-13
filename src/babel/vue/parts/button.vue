<template lang="pug">
  button.btn(type="button", :class="[color, isCursorClass, isTouchAnimation]", @click="$emit('click', $event.target.value)", @touchstart="touchstart", @touchend="touchend") {{value}}
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  $anim = stick 1.1s easeInOutCubic infinite

  .btn
    border: none
    border-radius: 4px
    font: $font-default
    padding: 0
    cursor: pointer
    user-select: none

    &:focus
      outline: none

    &:not(.no-cursor)
      transition: transform 0.3s easeInOutBack
      overflow: hidden
      position: relative

      &::after
        content: ''
        display: block
        position: absolute
        top: 0
        bottom: 0
        left: 0
        margin: auto
        transform: skewX(-25deg) translate3d(-10%, 0, 0)
        filter: blur(6px)
        border-left: 30px solid #fff
        width: 100%
        height: 200%
        opacity: 0

      &:hover::after
        animation: $anim
        @media (hover: none), (hover: on-demand)
          animation: none

    &.animation:not(.no-cursor)
      transform: scale(0.95)
      &::after
        animation: $anim!important

    &.blue
      background: color-blue
      color: #ffffff

    &.green
      background: color-green
      color: color-text

    &.gray
      background: color-gray
      color: color-text

    &.no-cursor
      cursor: default

  @keyframes stick
    0%
      opacity: 0
    50%
      opacity: 0.6
    100%
      opacity: 0
      transform: skewX(-30deg) translate3d(100%, 0, 0)
</style>

<script>
  // 階層が深くなる場合：https://jp.vuejs.org/v2/guide/components-custom-events.html#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AB%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E3%83%90%E3%82%A4%E3%83%B3%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0
  export default {
    props: {
      color: String,
      value: [String, Number],
      noCursor: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        touchAnimation: false
      }
    },
    computed: {
      isCursorClass () {
        return this.noCursor ? 'no-cursor' : ''
      },
      isTouchAnimation () {
        return this.touchAnimation ? 'animation' : ''
      }
    },
    methods: {
      touchstart () {
        this.touchAnimation = true
      },
      touchend () {
        this.touchAnimation = false
      }
    }
  }
</script>