<template lang="pug">
  .stabcd
    p あああ
    div {{product}}
    img(src="../../img/dummy.png", alt="", data-src="../../img/dummy.png")

    //- ワークスペースのルートから記述する場合
    img(src="~root/img/dummy.png", alt="")

    //- ワークスペースのimgディレクトリを直接指定する場合
    img(src="~img/dummy.png", alt="")
</template>

<style lang="stylus" scoped>
  // stylusのディレクトリを直接指定
  @import "~stylus/_assets/modules/_reset.styl"

  .stabcd
    color: #000000
    background: url(../../img/dummy.png)
</style>

<script>
  export default {
    // metaInfo: {
    //   title: 'bar'
    // },
    data () {
      return {}
    },
    computed: {
      product: () => IS_PRODUCTION
    }
  }
</script>