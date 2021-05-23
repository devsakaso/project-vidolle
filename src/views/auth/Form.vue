<template>
      <v-container class="mt-10">
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

<style scoped>
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
}

.switch-enter-to,
.switth-leave-from {
  opacity: 1;
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
