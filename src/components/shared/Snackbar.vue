<template>
      <v-snackbar
      v-model="$store.state.snackbar.show"
    >
  <!-- 
    グローバルなものなのでApp.vueに取り込む
  -->
      {{ $store.state.snackbar.text }}
      

      <template v-slot:action="{ attrs }">
        <v-btn
          @click="$store.commit('hideSnackbar')"
          color="primary"
          text
          v-bind="attrs"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
</template>