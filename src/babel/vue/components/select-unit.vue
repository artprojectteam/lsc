<template lang="pug">
  ul.selectUnit
    li(v-for="(val, idx) in category", :key="val")
      template(v-if="idx === index")
        v-button.selectUnit-button(color="gray", :value="val", no-cursor=true)
      template(v-else)
        v-button.selectUnit-button(color="green", :value="val", @click="change({ index: idx })")

    //-v-button(color="blue", value="abc", @click="cl('abf', 'hgn')")
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

    &-button
      width: 100%
      height: 40px
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
      ...mapActions({
        change: 'unit/selectSubCategory'
      })
    }
  }
</script>