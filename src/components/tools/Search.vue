<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    :disabled="$store.state.sorting"
    :class="{ 'closed': searchClosed && !$store.state.search}"
    class="mt-1 expanding-search"
    placeholder="検索"
    dense
    filled
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
  <!-- :disabled="$store.state.sorting"は、並び替えモード中に検索するとデータが消えてしまうので、disabledにして検索できないようにする -->
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true //closeを制御する
    }
  },
}
</script>

<style lang="sass">
  // 45pxというのは検証で微調整した結果
 .expanding-search
   transition: max-width 0.3s
   .v-input__slot
     cursor: pointer !important
     &::before, &::after
       border-color: transparent !important
   &.closed
     max-width: 45px
     .v-input__slot
        background: transparent !important
</style>