<template>
  <q-layout view="lHh Lpr lFf">

    <AppHeader />

    <q-page-container class="main-container">
      <transition appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
        <router-view />
      </transition>
    </q-page-container>

    <AppFooter />

  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from 'components/AppHeader.vue';
import AppFooter from 'components/AppFooter.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter
  },
});
</script>
