<template>
  <div class="d-flex justify-content-center align-items-center flex-column w-100" style="height: 100vh">
    <div>
      <h1>{{ doRegister ? 'Registrieren' : 'Login' }}</h1>
      <form @submit.prevent="submit()" style="min-width: 300px">
        <Message v-model:success="success" v-model:error="error" />
        <div>
          <EmailInput placeholder="Email" v-model="email" required></EmailInput>
        </div>
        <div v-if="doRegister">
          <TextInput placeholder="Benutzername" v-model="username" required></TextInput>
        </div>
        <div>
          <TextInput placeholder="Passwort" v-model="password" required></TextInput>
        </div>
        <Button class="btn btn-primary mt-2">{{ doRegister ? 'Registrieren' : 'Login' }}</Button>
      </form>
    </div>
    <a href="#" class="mt-2" @click="doRegister = !doRegister">{{ doRegister ? 'Login' : 'Registrieren' }}</a>
  </div>
</template>
<script lang="ts" setup>
import { Button, TextInput, EmailInput, Message } from 'custom-mbd-components';
import * as API from '../API';
import { ref } from 'vue';
import router from '../router';

const email = ref('');
const password = ref('');
const username = ref('');

const doRegister = ref(false);
const success = ref('');
const error = ref('');

async function submit() {
  try {
    if (!email.value || !password.value || (doRegister.value && !username.value)) return (error.value = 'Bitte alle Felder ausfüllen');

    if (doRegister.value) {
      await API.register(email.value, password.value, username.value);
    } else {
      await API.login(email.value, password.value);
    }
    router.push('/');
  } catch (e: any) {
    console.log(e);
    error.value = e.message;
  }
}
</script>
