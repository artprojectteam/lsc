<template lang="pug">
  transition-group.selectUnit(name="fade-list", tag="ul", @before-enter="beforeEnter", @after-enter="afterEnter", @enter-cancelled="afterEnter")
    li.selectUnit-list(v-for="(val, idx) in category", :data-index="idx", :key="val", :class="{wide: isWide(val)}")
      v-button.selectUnit-button.g-unit(color="green", :value="val", :is-active="idx === index", @click="change({ index: idx })")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .selectUnit
    list-style: none
    margin: 0
    padding: 0
    display: grid
    grid-gap: space-mobile
    grid-template-columns: repeat(2, 1fr)
    position: relative
    @media tablet
      grid-template-columns: repeat(2, 1fr)

    &-button
      width: 100%
      height: 40px
      @media tablet
        height: 60px

    &-list.wide
      grid-column: 1 / 3
      @media tablet
        grid-column: auto
</style>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState({
        unit: (state) => state.unit.current,
        category: (state) => state.unit.category,
        index: (state) => state.unit.index
      })
    },
    methods: {
      isWide (val) {
        return val === 'nautical mile'
      },
      beforeEnter (el) {
        el.style.transitionDelay = `${50 * parseInt(el.dataset.index, 10)}ms`
      },

      afterEnter (el) {
        el.style.transitionDelay = ''
      },

      ...mapActions({
        change: 'unit/selectSubCategory'
      })
    }
  }
</script>