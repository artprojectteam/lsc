<template lang="pug">
  ul.changeUnit
    li.changeUnit-list(v-for="val in list", :key="val")
      v-button.changeUnit-button.g-category(color="blue", :value="val", :is-active="val === current", @click="change({ val })")
</template>

<style lang="stylus" scoped>
  @require "~stylus/_assets/modules/_content.styl"

  .changeUnit
    list-style: none
    margin: 0
    padding: 0
    display: grid
    grid-gap: space-mobile
    grid-template-columns: repeat(3, 1fr)
    @media tablet
      grid-template-columns: 100%
      grid-gap: space-tablet

    &-button
      width: 100%
      height: 40px
      text-transform: uppercase
      @media tablet
        height: 60px
</style>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState({
        current: (state) => state.unit.current
      }),
      ...mapGetters({
        list: 'unit/mainCategory'
      })
    },
    methods: {
      select (val) {
        this.change({ val })
      },
      ...mapActions({
        change: 'unit/changeCategory'
      })
    }
  }
</script>