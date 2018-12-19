<template lang="pug">
  button.btn(type="button", :class="[color, isTouchAnimation, isActiveClass]", @click="$emit('click', $event.target.value)", @touchstart="touchstart", @touchend="touchend") {{value}}
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
    transition: transform 0.3s easeInOutBack, background $easing, color $easing
    overflow: hidden
    position: relative
    @media (hover: hover)
      &:hover
        transform: scale(0.95)
      &:hover::after
        animation: $anim

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

    &:focus
      outline: none

    &.animation
      transform: scale(0.95)
      &::after
        animation: $anim!important

    &.blue
      background: color-main
      color: #ffffff

    &.green
      background: color-point
      color: color-text

    &.gray
      background: color-active
      color: color-text

    &.orange
      background: color-sub
      color: #fff

    &.no-cursor
      cursor: default

    &.active
      background: color-active
      color: color-text
      cursor: default
      pointer-events: none

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
      color: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number],
        required: true
      },
      isActive: {
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
      isTouchAnimation () {
        return this.touchAnimation ? 'animation' : ''
      },
      isActiveClass () {
        return this.isActive ? 'active' : ''
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