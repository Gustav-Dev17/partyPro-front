<template>
  <q-layout view="lHh Lpr lFf">

    <AppHeader />

    <q-page-container class="signin-container">
      <transition appear enter-active-class="animated fadeInUp slow" leave-active-class="animated fadeOutDown slow">
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
  name: 'SigninLayout',
  components: {
    AppHeader,
    AppFooter
  },
});
</script>
