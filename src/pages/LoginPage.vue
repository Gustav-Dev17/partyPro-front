<template>
  <q-page class="column items-center justify-center">


    <img class="login-header-image" src="logo.png" alt="PartyPro logo">

    <div class="login-card">

      <h1 class="login-card-title">Entre na sua conta</h1>

      <q-form class="login-form" @submit="onSubmit">

        <div class="login-form-group">
          <label class="login-form-label" for="email">E-mail <span class="is-required">*</span></label>
          <input v-model="form.email" type="email" id="email" class="login-form-input" placeholder="Digite seu email"
            required>
        </div>

        <div class="login-form-group">
          <label class="login-form-label" for="senha">Senha <span class="is-required">*</span></label>
          <input v-model="form.password" type="password" id="senha" class="login-form-input"
            placeholder="Digite sua senha" minlength="8" required>
        </div>

        <div class="login-form-button-container">
          <button class="login-form-button" label="Submit" type="submit" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? 'Aguarde...' : 'Login' }}
          </button>
        </div>

        <router-link class="generic-link" to="/forgotPassword">Esqueci minha senha</router-link>

      </q-form>
    </div>


  </q-page>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, Ref } from 'vue';
import { FormLogin } from '../types/form.types';
import { useLoginStore } from '../stores/login-store';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loading = ref(false);
    const loginStore = useLoginStore();

    const form: Ref<FormLogin> = ref({
      email: '',
      password: ''
    });

    onBeforeMount(() => {
      if (loginStore.isAuthenticated) {
        router.push({ path: '/home' });
      }
    });

    const onSubmit = () => {

      if (!form.value.email || !form.value.password) {
        $q.notify({ type: 'negative', message: 'Informe e-mail e senha!' });
        return;
      }

      loading.value = true;

      api.post('/login', form.value)
        .then((response) => {
          loginStore.userLogin(response.data.token);
          $q.notify({ type: 'positive', message: response.data.message });
          router.push({ path: '/home' });
        })
        .catch((error) => {
          $q.notify({ type: 'negative', message: error.response.data.message });
        })
        .finally(() => {
          loading.value = false;
        })

    };

    return {
      loading,
      form,
      onSubmit
    };

  }

});
</script>

