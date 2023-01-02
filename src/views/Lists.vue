<template>
  <div class="w-100 contentHeight-75 overflow-auto d-flex flex-column align-items-center pt-5">
    <h1 class="text-center text-light">Lists</h1>
    <div class="mt-2 w-50" v-for="list in currentLists" :key="list.id">
      <Button @click="router.push(`/List/${list.id}`)" style="background-color: green; border: none; width: 100%">{{ list.name }}</Button>
    </div>
  </div>
  <div class="addButton d-flex justify-content-center align-items-center flex-column">
    <control class="mb-2" v-if="!doCreate" @click.stop="doCreate = true"><i class="fas fa-plus"></i></control>
    <form v-if="doCreate" @submit.prevent="createList()">
      <TextInput placeholder="Name" v-model="newListName" required></TextInput>
      <Button class="me-2 mt-2">Erstellen</Button>
      <Button type="button" class="mt-2" @click.stop="doCreate = false">abbrechen</Button>
    </form>
    <Message v-model:success="success" v-model:error="error" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import control from '../components/controlButton.vue';
import { Button, TextInput, Message } from 'custom-mbd-components';
import * as API from '../API';
import router from '../router';
import type { List } from '../types';

const newListName = ref('');
const success = ref('');
const error = ref('');
const doCreate = ref(false);

const currentLists = ref<List[]>([]);

async function getLists() {
  try {
    currentLists.value = await API.getLists();
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}
getLists();

async function createList() {
  try {
    currentLists.value.push(await API.createList(newListName.value));
    doCreate.value = false;
    success.value = `Liste "${newListName.value}" wurde erstellt.`;
    newListName.value = '';
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}
</script>
