<template>
  <q-layout view="lHh Lpr lFf">

    <AppHeader />

    <q-page-container class="home-container">
      <transition appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
        <router-view />
      </transition>
    </q-page-container>


  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from 'components/AppHeader.vue';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    AppHeader
  },
});
</script>
