<template>
  <div class="d-flex flex-column align-items-center w-100 overflow-auto py-5">
    <h2 class="text-light me-2 mb-0 d-flex align-items-center">{{ list?.name }}</h2>
    <Message v-model:error="error" />
    <div v-if="friends.length > 0" class="w-100 mt-5">
      <div v-for="friend in friends" class="settingsgrid mb-2 w-100 px-4 text-light">
        <h3 class="mb-0">{{ friend.name }}</h3>
        <control v-if="list?.authorized.find(id => id == friend.id)" size="40px" style="font-size: 20px" @click.stop="changeAuthState(friend.id)">
          <i class="fas fa-check"></i>
        </control>
        <control v-else size="40px" style="font-size: 20px; background-color: red" @click.stop="changeAuthState(friend.id)">
          <i class="fas fa-check"></i>
        </control>
      </div>
    </div>
    <div v-else>
      <h5 class="text-light mt-5 text-center px-5">Du hast keine Freunde die du hinzufügen kannst</h5>
    </div>
  </div>
</template>
<style lang="scss">
.settingsgrid {
  display: grid;
  grid-template-columns: auto 40px;
  gap: 10px;
}
.bg-green {
  background-color: green;
}
.bg-red {
  background-color: red;
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import type { List, User } from '../types';
import * as API from '../API';
import { Message } from 'custom-mbd-components';
import control from '../components/controlButton.vue';

const list = ref<List | null>(null);
const listId = window.location.href.split('/').at(-1)!;
const error = ref('');
const friends = ref<User[]>([]);

async function getList() {
  try {
    list.value = await API.getList(listId);
  } catch (e: any) {
    error.value = e.message;
  }
}
getList();

async function getFriends() {
  try {
    friends.value = await API.getFriends();
  } catch (e: any) {
    error.value = e.message;
  }
}
getFriends();

async function changeAuthState(id: string) {
  if (!list.value) return;
  try {
    await API.changeAuthState(list.value, id);
    getList();
  } catch (e: any) {
    error.value = e.message;
  }
}
</script>
