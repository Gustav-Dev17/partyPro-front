<template>
  <q-page class="column items-center justify-center">

    <div class="home-search">
      <input type="text" class="home-search-input" placeholder="Pesquise o evento" />
      <i class="home-search-icon material-icons">search</i>
    </div>

    <div class="home-category-list">
      <q-card v-for="(category, index) in categories" :key="index" class="home-category-card">
        <div class="home-category-card-content">
          {{ category.name }}
        </div>
      </q-card>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const categories = ref([
      { name: 'Categoria 1' },
      { name: 'Categoria 2' },
      { name: 'Categoria 3' },
      { name: 'Categoria 4' },
      { name: 'Categoria 5' },
      // Adicione mais categorias conforme necessário
    ]);

    return {
      categories,
    };
  },
});
</script>

