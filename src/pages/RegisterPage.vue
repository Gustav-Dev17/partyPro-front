<template>
  <q-page class="column items-center justify-center">

      <h1 class="signin-card-title">Criar conta</h1>

      <div class="signin-card">
        <q-form class="signin-form" @submit="onSubmit">

          <div class="signin-form-group">
            <label class="signin-form-label" for="nome">Nome de organizador <span class="is-required">*</span></label>
            <input type="text" id="nome" class="signin-form-input" placeholder="Digite seu nome">
          </div>

          <div class="signin-form-group">
            <label class="signin-form-label" for="id_document_number">Número do documento <span
                class="is-required">*</span></label>
            <input class="signin-form-input" type="text" id="id_document_number" name="id_document_number"
              placeholder="Digite o número de CPF ou CNPJ">
          </div>

          <div class="signin-form-group">
            <label class="signin-form-label" for="id_document_number">Contato (WhatsApp) <span
                class="is-required">*</span></label>
            <input class="signin-form-input" type="tel" id="phone" name="phone" placeholder="Digite seu contato">
          </div>

          <div class="signin-form-group">
            <label class="signin-form-label" for="id_document_number">URL do Instagram</label>
            <input class="signin-form-input" type="text" id="id_document_number" name="id_document_number"
              placeholder="Insira a URL do perfil do Instagram">
          </div>

          <div class="signin-form-group">
            <label class="signin-form-label" for="email">E-mail <span class="is-required">*</span></label>
            <input type="email" id="email" class="signin-form-input" placeholder="Digite seu email">
          </div>

          <div class="signin-form-group">
            <label class="signin-form-label" for="senha">Senha <span class="is-required">*</span></label>
            <input type="password" id="senha" class="signin-form-input" placeholder="Digite sua senha">
          </div>

          <div class="signin-form-button-container">
            <button class="signin-form-button" label="Submit" type="submit">Registrar-me</button>
          </div>

          <router-link class="generic-link" to="/login">Já tenho uma conta</router-link>


        </q-form>
      </div>


  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'RegisterPage',

  setup() {

    const accept = ref(false)
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const id_document = ref(null);
    const id_document_number = ref(null);
    const phone = ref(null);
    const instagram_url = ref(null);

    const onSubmit = () => {
      // Aqui você pode acessar os valores dos campos
      console.log('Nome:', name.value);
      console.log('E-mail:', email.value);
      console.log('Senha:', password.value);
      console.log('Tipo de Documento:', id_document.value);
      console.log('Número do Documento:', id_document_number.value);
      console.log('Telefone:', phone.value);
      console.log('URL do Instagram:', instagram_url.value);

      // Você pode adicionar sua lógica de validação aqui

      // Exemplo: Verificar se o campo de aceitação está marcado
      if (!accept.value) {
        console.log('Você precisa aceitar os termos e condições.');
        return;
      }

      // Se tudo estiver válido, você pode enviar o formulário ou realizar outras ações
      console.log('Formulário enviado com sucesso!');
    };

    return {
      name,
      email,
      password,
      id_document,
      id_document_number,
      phone,
      instagram_url,
      accept,

      onSubmit
    };

  }

});
</script>

