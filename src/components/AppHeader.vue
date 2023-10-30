<template>
  <q-header class="main-header" elevated>
    <q-toolbar>

      <q-toolbar-title>
        <router-link :to="isAuthenticated ? '/home' : '/'">
          <img class="main-header-image" src="logo.png" alt="PartyPro logo">
        </router-link>
      </q-toolbar-title>

      <router-link v-if="!isRegisterRoute && !isAuthenticated" class="main-header-link"
        to="/register">Registrar-se</router-link>

      <router-link v-if="isAuthenticated && isAccountRoute" class="main-header-link" to="/home">Início</router-link>
      <router-link v-if="isAuthenticated && !isAccountRoute" class="main-header-link" to="/account">Minha conta</router-link>

      <div v-if="!isLoginRoute && !isRegisterRoute" class="main-header-separator"></div>

      <router-link v-if="!isLoginRoute && !isAuthenticated" class="main-header-entrar-link"
        to="/login">Entrar</router-link>

      <button v-if="isAuthenticated" class="main-header-entrar-link" @click="onLogout">Sair</button>

    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login-store';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loginStore = useLoginStore();
    const isLoginRoute = computed(() => route.path === '/login');
    const isRegisterRoute = computed(() => route.path === '/register');
    const isAccountRoute = computed(() => route.path === '/account');
    const isAuthenticated = computed(() => loginStore.isAuthenticated);

    const onLogout = () => {
      loginStore.userLogout();
      router.push({ path: '/login' });
    };

    return {
      isRegisterRoute,
      isLoginRoute,
      isAccountRoute,
      isAuthenticated,
      onLogout
    };
  },
});
</script>
