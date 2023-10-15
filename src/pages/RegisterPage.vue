<template>
  <q-page class="column items-center justify-center">

    <h1 class="signin-card-title">Criar conta</h1>

    <div class="signin-card">
      <q-form class="signin-form" @submit="onSubmit">

        <div class="signin-form-group">
          <label class="signin-form-label" for="input_name">Nome de organizador <span class="is-required">*</span></label>
          <input v-model="form.name" type="text" id="input_name" class="signin-form-input"
            placeholder="Digite o nome do organizador" required />
        </div>

        <div class="signin-form-group">
          <label class="signin-form-label" for="input_id_document_number">Número do documento <span
              class="is-required">*</span></label>
          <input v-maska:[docMask] v-model="form.id_document_number" class="signin-form-input" type="text"
            id="input_id_document_number" name="id_document_number" placeholder="Digite o número de CPF ou CNPJ"
            required />
        </div>

        <div class="signin-form-group">
          <label class="signin-form-label" for="input_phone">Contato (WhatsApp) <span class="is-required">*</span></label>
          <input v-model="form.phone" v-maska data-maska="(##) #####-####" class="signin-form-input" type="tel"
            id="input_phone" name="phone" placeholder="Digite seu contato" required />
        </div>

        <div class="signin-form-group">
          <label class="signin-form-label" for="id_url_instagram">URL do Instagram</label>
          <input v-model="form.instagram_url" class="signin-form-input" type="text" id="id_url_instagram"
            name="id_document_number" placeholder="Insira a URL do perfil do Instagram" />
        </div>

        <div class="signin-form-group">
          <label class="signin-form-label" for="input_email">E-mail <span class="is-required">*</span></label>
          <input v-model="form.email" type="email" id="input_email" class="signin-form-input"
            placeholder="Digite seu email" required />
        </div>

        <div class="signin-form-group">
          <label class="signin-form-label" for="input_senha">Senha <span class="is-required">*</span></label>
          <input v-model="form.password" type="password" id="input_senha" class="signin-form-input"
            placeholder="Digite sua senha" minlength="8" required />
        </div>

        <div class="signin-form-group">
          <label class="signin-form-label" for="confirmação_senha">Confirmação de senha <span
              class="is-required">*</span></label>
          <input v-model="confPassword" type="confPassword" id="confirmação_senha" class="signin-form-input"
            placeholder="Digite a confirmação de senha" minlength="8" required />
        </div>

        <div class="signin-form-box">
          <input v-model="accept" type="checkbox" id="aceitoTermos" class="signin-form-checkbox" />
          <label class="signin-form-label" for="aceitoTermos">Aceito os termos e condições</label>
        </div>

        <div class="signin-form-button-container">
          <button class="signin-form-button" label="Submit" type="submit" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? 'Aguarde...' : 'Registrar-me' }}
          </button>
        </div>

        <router-link class="generic-link" to="/login">Já tenho uma conta</router-link>

      </q-form>
    </div>


  </q-page>
</template>

<script lang="ts">
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, onBeforeMount, Ref } from 'vue';
import { reactive, ref, watch } from 'vue';
import { FormRegister } from '../types/form.types';
import { useLoginStore } from '../stores/login-store';

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const router = useRouter();
    const loginStore = useLoginStore();
    const $q = useQuasar();
    const loading = ref(false);
    const docMask = reactive({ mask: '###.###.###-##', eager: true });
    const confPassword = ref('');
    const accept = ref(false);

    const form: Ref<FormRegister> = ref({
      name: '',
      email: '',
      password: '',
      id_document: '',
      id_document_number: '',
      phone: '',
      instagram_url: ''
    });

    onBeforeMount(() => {
      if (loginStore.isAuthenticated) {
        router.push({ path: '/home' });
      }
    });

    watch(() => form.value.id_document_number, (newValue) => {
      const length = newValue?.length ?? 0;
      docMask.mask = length > 14 ? '##.###.###/####-##' : '###.###.###-##';
      form.value.id_document = length > 14 ? 'CNPJ' : 'CPF';
    });

    const onSubmit = () => {

      if ((form.value.id_document_number.length > 14 && form.value.id_document_number.length < 18) || (form.value.id_document_number.length < 14)) {
        $q.notify({ type: 'negative', message: 'O número de documento está incompleto!' });
        return;
      }

      if (!accept.value) {
        $q.notify({ type: 'negative', message: 'Você precisa aceitar os termos e condições!' });
        return;
      }

      if (form.value.password != confPassword.value) {
        $q.notify({ type: 'negative', message: 'Senha e confirmação de senha não conferem!' });
        return;
      }

      loading.value = true;

      api.post('/createOrganiser', form.value)
        .then((response) => {
          $q.notify({ type: 'positive', message: response.data.message });
          setTimeout(() => { router.push({ path: '/login' }); }, 2000);
        })
        .catch((error) => {
          $q.notify({ type: 'negative', message: error.response.data.message });
        })
        .finally(() => {
          loading.value = false;
        })

    };

    return {
      form,
      confPassword,
      accept,
      loading,
      onSubmit,
      docMask
    };

  }

});
</script>

