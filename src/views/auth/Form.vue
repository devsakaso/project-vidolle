<template>
  <v-main>
      <v-container>
        <v-row align="center" justify="center" class="my-auto">
          <v-col cols="12" sm="8" md="9">
            <v-card class="elevation-12">
              <transition  mode="out-in" appear name="switch">
                <Login v-if="$store.state.step == 1" :value="1"/>
                <Signup v-if="$store.state.step == 2" :value="2"/>
              </transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-main>
</template>

<script>
import Login from '@/components/form/Login.vue'
import Signup from '@/components/form/Signup.vue'
export default {
  components: {
    Login,
    Signup
  }
}
</script>

<style lang="sass" scoped>
.switch
  &-enter-from,
  &-leave-to
    opacity: 0
  &-enter-to,
  &-leave-from
    opacity: 1
  &-enter-active,
  &-leave-active 
    transition: all 0.3s ease-in-out
</style>
