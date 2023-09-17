<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="main-header" elevated>
      <q-toolbar>

        <q-toolbar-title>
          <img class="main-header-image" src="logo.png" alt="PartyPro logo">
        </q-toolbar-title>

        <router-link class="main-header-link" to="/categories">Categorias</router-link>

        <div class="main-header-separator"></div>


        <router-link class="main-header-link" to="/register">Registrar-se</router-link>

        <router-link class="main-header-entrar-link" to="/login">Entrar</router-link>

        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />   -->

      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->

    <q-page-container class="main-container">
      <router-view />
    </q-page-container>

    <q-footer class="main-footer">
      © PartyPro Team – All rights reserved
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
//import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    //EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(true)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
