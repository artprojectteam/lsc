<template lang="pug">
  transition-group.selectUnit(name="fade-list", tag="ul", @before-enter="beforeEnter", @after-enter="afterEnter", @enter-cancelled="afterEnter")
    li.selectUnit-list(v-for="(val, idx) in category", :data-index="idx", :key="val")
      v-button.selectUnit-button(color="gray", :value="val", no-cursor=true, v-if="idx === index", :key="'un-'+val")
      v-button.selectUnit-button(color="green", :value="val", @click="change({ index: idx })", v-else, :key="'ok-'+val")
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