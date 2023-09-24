<template>
  <div class="fullscreen error-404-page text-white text-center q-pa-md flex flex-center">
    <div style="margin:90px">

      <div style="font-size: 8vh">
        Página inexistente
      </div>

      <div class="text-h2" style="opacity:.4">
        Opa. Não há nada aqui...
      </div>

      <q-btn class="q-mt-xl " color="white" text-color="blue" unelevated to="/" label="Voltar ao início" no-caps
        rounded />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound'
});
</script>
