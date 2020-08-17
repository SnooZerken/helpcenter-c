<template>
  <v-app>

    <v-app-bar app dense dark>
        <v-btn small class="ml-2" to="/">home</v-btn>
        <v-btn small class="ml-2" to="/sections" v-if="$keycloak.authenticated">sections</v-btn>
        <v-btn small class="ml-2" to="/about">about</v-btn>
        <v-btn small class="ml-2" @click="$keycloak.loginFn" v-if="!$keycloak.authenticated">Log in</v-btn>
        <v-btn small class="ml-2" @click="$keycloak.logoutFn" v-if="$keycloak.authenticated">Log out</v-btn>
    </v-app-bar>

    <v-main>
        <v-container>

          <router-view></router-view>

        </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  data: () => ({
    //
  }),
};
</script>