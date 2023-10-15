<template>
  <q-page class="column items-center justify-center">

    <div class="index-search">
      <input type="text" class="index-search-input" placeholder="Pesquise o evento por nome, categoria, local..." />
      <i class="index-search-icon material-icons">search</i>
    </div>

    <div class="index-category-list">
      <q-card v-for="(category, index) in categories" :key="index" class="index-category-card">
        <div class="index-category-card-content">
          {{ category.name }}
        </div>
      </q-card>
    </div>

  </q-page>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login-store';
import { defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter();
    const loginStore = useLoginStore();

    onBeforeMount(() => {
      if (loginStore.isAuthenticated) {
        router.push({ path: '/home' });
      }
    });

    const categories = ref([
      { name: 'Shows' },
      { name: 'Baladas' },
      { name: 'Discoteca' },
      { name: 'Open bar' },
      { name: 'Raves' }
    ]);

    return {
      categories,
    };
  },
});
</script>

