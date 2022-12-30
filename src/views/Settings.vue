<template>
  <div class="m-5 d-flex flex-column justify-content-center align-items-center w-100">
    <Message v-model:success="success" v-model:error="error" />
    <control @click.stop="logout()"><i class="fas fa-sign-out-alt"></i></control>
  </div>
</template>
<script lang="ts" setup>
import router from '../router';
import control from '../components/controlButton.vue';
import { Message } from 'custom-mbd-components';
import * as API from '../API';
import { ref } from 'vue';

const success = ref('');
const error = ref('');

async function logout() {
  try {
    await API.logout();
    router.push('/login');
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}
</script>
