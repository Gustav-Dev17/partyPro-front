<template>
  <q-page class="column items-center justify-center">

    <div class="account-container">

      <div class="account-box-full">

        <div class="account-box-full-account-pic-box">
          <div class="account-box-full-account-pic-ellipse">
            <img class="account-box-full-account-pic-ellipse-icon" src="../assets/svg/person.svg">
          </div>
        </div>

        <div class="account-box-full-account-info">
          <p class="account-box-full-account-info-name" :class="{ 'animated-gradient': loadingFields }">{{ userInfo.name
          }}</p>
          <p class="account-box-full-account-info-email" :class="{ 'animated-gradient': loadingFields }">{{ userInfo.email
          }}
          </p>
        </div>

      </div>

      <div class="account-box-half">

        <div class="account-box-half-container">
          <div class="account-box-half-container-editable-data">

            <p class="account-box-half-container-editable-data-title">Dados da conta</p>

            <p class="account-box-half-container-editable-data-subtitle">URL do Instagram</p>
            <p class="account-box-half-container-editable-data-value" :class="{ 'animated-gradient': loadingFields }">
              {{ userInfo.instagram_url }}
            </p>

            <p class="account-box-half-container-editable-data-subtitle">Contato</p>
            <p class="account-box-half-container-editable-data-value" :class="{ 'animated-gradient': loadingFields }">
              {{ userInfo.phone }}
            </p>

            <hr class="account-box-separator">

            <p class="account-box-half-container-editable-data-subtitle">Proprietário da conta</p>
            <p class="account-box-half-container-editable-data-value" :class="{ 'animated-gradient': loadingFields }">
              {{ userInfo.doc }} {{ userInfo.doc_type }}
            </p>

          </div>
        </div>

        <div class="account-box-half-container">

          <div class="account-box-half-container-options">

            <div class="account-box-half-container-options-group">
              <button class="account-box-half-container-options-group-btn" type="button">
                <img width="20" height="20" src="../assets/svg/check-circle-fill.svg">
              </button>
              <span class="account-box-half-container-options-group-description">Aut. em dois fatores</span>
            </div>

            <div class="account-box-half-container-options-group">
              <button class="account-box-half-container-options-group-btn" type="button">
                <img width="20" height="20" src="../assets/svg/lock-fill.svg">
              </button>
              <span class="account-box-half-container-options-group-description">Alterar senha</span>
            </div>

            <div class="account-box-half-container-options-group">
              <button class="account-box-half-container-options-group-btn" type="button" @click="dialogDelAccount = true">
                <img width="20" height="20" src="../assets/svg/trash3-fill.svg">
              </button>
              <span class="account-box-half-container-options-group-description" @click="dialogDelAccount = true">Apagar
                conta</span>
            </div>

          </div>

        </div>
      </div>

    </div>

    <q-dialog v-model="dialogDelAccount" persistent>


      <q-card style="min-width: 350px">


        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="delete" color="red" text-color="white" style="margin-right: 10px;" />
          <div class="text-h5">Exclusão da conta</div>
          <span class="q-ml-sm"></span>
        </q-card-section>

        <q-card-section class="row items-center">
          <div class="custom-flex-container">

            <span class="q-ml-sm">Deseja realmente excluir a sua conta? Esta ação não pode ser desfeita, e seus dados
              não
              poderão ser recuperados.</span>
          </div>
        </q-card-section>
        <q-form class="login-form" @submit="onSubmitDelAcc">
          <q-card-section class="q-pt-none">
            <input v-model="passConfirmation" type="password" id="senha" class="form-input"
              placeholder="Digite sua senha para confirmar" minlength="8" dense required>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn text-color="black" flat label="Cancelar" v-close-popup />

            <q-btn flat text-color="red" bold type="submit" :disabled="loadingAction">
              <span v-if="loadingAction" class="loading-dialog-spinner"></span>
              {{ loadingAction ? ' Aguarde...' : 'Excluir conta' }}
            </q-btn>

          </q-card-actions>
        </q-form>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script lang="ts">
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login-store';
import { defineComponent, onBeforeMount, ref } from 'vue';


export default defineComponent({
  name: 'AccountPage',
  setup() {

    const $q = useQuasar();
    const router = useRouter();
    const loginStore = useLoginStore();
    const loadingAction = ref(false);
    const loadingFields = ref(true);
    const dialogDelAccount = ref(false);
    const passConfirmation = ref('');

    const userInfo = ref({
      name: '',
      email: '',
      phone: '',
      instagram_url: '',
      doc: '',
      doc_type: ''
    });

    onBeforeMount(() => {
      if (!loginStore.isAuthenticated) {
        router.push({ path: '/login' });
      }
      loadUserInfo();
    });



    const loadUserInfo = () => {
      api.get('/getOrganiser', {
        headers: {
          Authorization: `Bearer ${loginStore.userToken}`,
        }
      })
        .then((response) => {
          userInfo.value.name = response.data.name;
          userInfo.value.email = response.data.email;
          userInfo.value.instagram_url = response.data.instagram_url;
          userInfo.value.email = response.data.email;
          userInfo.value.phone = response.data.phone;
          userInfo.value.doc = response.data.id_document_number;
          userInfo.value.doc_type = '(' + response.data.id_document + ')';
        })
        .catch((error) => {
          $q.notify({ type: 'negative', message: error.response.data.message });
        })
        .finally(() => {
          loadingFields.value = false;
        })
    };

    const onSubmitDelAcc = () => {

      if (!passConfirmation.value || passConfirmation.value.length < 8) {
        $q.notify({ type: 'negative', message: 'É necessário informar uma senha válida!' });
        loadingAction.value = false;
        return;
      }

      loadingAction.value = true;

      const requestData = {
        password: passConfirmation.value
      };

      api.delete('/deleteOrganiser', {
        headers: {
          Authorization: `Bearer ${loginStore.userToken}`,
        },
        data: requestData
      })
        .then(() => {
          loginStore.userLogout();
          router.push({ path: '/login' });
        })
        .catch((error) => {
          $q.notify({ type: 'negative', message: error.response.data.message });
        })
        .finally(() => {
          loadingAction.value = false;
        });

    };

    return {
      userInfo,
      loadingFields,
      loadingAction,
      dialogDelAccount,
      passConfirmation,
      onSubmitDelAcc
    };
  },
});
</script>

