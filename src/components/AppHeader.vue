<template>
  <q-header class="main-header" elevated>
    <q-toolbar>


      <q-toolbar-title>
        <router-link :to="isLogged ? '/home' : '/'">
          <img class="main-header-image" src="logo.png" alt="PartyPro logo">
        </router-link>
      </q-toolbar-title>

      <router-link v-if="!isRegisterRoute" class="main-header-link" to="/register">Registrar-se</router-link>

      <div v-if="!isLoginRoute && !isRegisterRoute" class="main-header-separator"></div>

      <router-link v-if="!isLoginRoute" class="main-header-entrar-link" to="/login">Entrar</router-link>
      <router-link v-if="isLogged" class="main-header-entrar-link" to="/login">Home</router-link>


    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';


export default defineComponent({
  name: 'AppHeader',
  setup() {
    const route = useRoute();
    const isRegisterRoute = route.path === '/register';
    const isLoginRoute = route.path === '/login';

    const isLogged = false;

    return {
      isRegisterRoute,
      isLoginRoute,
      isLogged
    };
  },
});
</script>
