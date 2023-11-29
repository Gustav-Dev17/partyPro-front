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
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login-store';
import { defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loginStore = useLoginStore();
    const categories = ref([] as {id: string, name: string}[]);

    onBeforeMount(() => {
      if  (loginStore.isAuthenticated) {
        router.push({ path: '/home' });
      }
      GetCategories();
    });

    const GetCategories = () => {
      api.get('/getCategories')
        .then((response) => {
         categories.value = response.data;
        })
        .catch((error) => {
          $q.notify({ type: 'negative', message: error.response.data.message });
        })
      }
        




   
    return {
      categories,
    };
  },
});
</script>

