<template>
  <q-page class="column items-center justify-center">



  </q-page>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login-store';
import { defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
  name: 'HomePage',
  setup() {

    const router = useRouter();
    const loginStore = useLoginStore();

    onBeforeMount(() => {
      if (!loginStore.isAuthenticated) {
        router.push({ path: '/login' });
      }
    });
    // const categories = ref([
    //   { name: 'Shows' },
    //   { name: 'Baladas' },
    //   { name: 'Discoteca' },
    //   { name: 'Open bar' },
    //   { name: 'Raves' }
    // ]);

    return {
      //categories,
    };
  },
});
</script>

