<template>
  <div class="d-flex flex-column justify-content-around align-items-center w-100">
    <div>
      <control v-if="!doCreate" @click.stop="doCreate = true"><i class="fas fa-plus"></i></control>
      <Message v-model:success="success" v-model:error="error" />
      <form v-if="doCreate">
        <TextInput placeholder="Name" v-model="newListName"></TextInput>
        <Button @click.stop="createList()">Erstellen</Button>
        <Button @click.stop="doCreate = false">abbrechen</Button>
      </form>
    </div>

    <div class="d-flex flex-column overflow-auto"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import control from '../components/controlButton.vue';
import { Button, TextInput, Message } from 'custom-mbd-components';
import * as API from '../API';

const newListName = ref('');
const success = ref('');
const error = ref('');
const doCreate = ref(false);

async function createList() {
  try {
    await API.createList(newListName.value);
    doCreate.value = false;
    newListName.value = '';
    success.value = `Liste ${newListName.value} wurde erstellt.`;
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}
</script>
