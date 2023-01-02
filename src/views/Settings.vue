<template>
  <div class="m-5 d-flex flex-column justify-content-center align-items-center w-100">
    <Message v-model:error="error" />
    <control @click.stop="logout()">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <i class="fas fa-sign-out-alt"></i>
        <div class="mt-2" style="font-size: 15px">Logout</div>
      </div>
    </control>
  </div>
</template>
<script lang="ts" setup>
import router from '../router';
import control from '../components/controlButton.vue';
import { Message } from 'custom-mbd-components';
import * as API from '../API';
import { ref } from 'vue';

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
