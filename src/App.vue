<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <router-view />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>
