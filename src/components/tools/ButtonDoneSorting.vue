<template>
  <!-- TODO: 現在開発中 -->
  <v-btn
  @click="$store.commit('toggleSorting')"
  class="button-done-sorting"
  color="primary"
  >
    並び替えを完了する
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="sass">
 .button-done-sorting
   position: fixed
   bottom: 20px
   left: 50%
   transform: translateX(-50%)

</style>