<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fuid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="$store.state.step">
                <v-window-item :value="1" transition="slide-x-reverse-transition">
                  <Login/>
                </v-window-item>
              <v-window-item
              :value="2"
               transition="slide-x-reverse-transition"
              >
              <Signup/>
              </v-window-item>

              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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

