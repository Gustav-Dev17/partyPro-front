<template>
  <q-page class="column items-center justify-center">

    <img class="login-header-image" src="logo.png" alt="PartyPro logo">

    <div class="login-card">

      <h1 class="login-card-title">Recupere seu acesso</h1>

      <q-form class="login-form" @submit="onSubmit">

        <div class="login-form-group">
          <label class="login-form-label" for="email">E-mail de cadastro<span class="is-required">*</span></label>
          <input type="email" id="email" class="login-form-input" placeholder="Digite o e-mail da conta">
        </div>

        <div class="login-form-button-container">
          <button class="login-form-button" label="Submit" type="submit">Enviar</button>
        </div>

        <router-link class="generic-link" to="/login">Voltar</router-link>

      </q-form>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'ForgotPassPage',

  setup() {

    const email = ref(null);
    const password = ref(null);

    const onSubmit = () => {
      // Aqui você pode acessar os valores dos campos
      console.log('E-mail:', email.value);
      console.log('Senha:', password.value);

      // Se tudo estiver válido, você pode enviar o formulário ou realizar outras ações
      console.log('Formulário enviado com sucesso!');
    };

    return {
      email,
      password,
      onSubmit
    };

  }

});
</script>

