<template>
  <div class="d-flex flex-column w-100 text-light py-5 align-items-center justify-content-between">
    <div class="d-flex flex-column align-items-center w-100">
      <h1>Friendlist</h1>
      <div class="text-dark" v-if="otherUsers.length > 0">
        <SelectInput
          @select-item="user => addFriend(user)"
          placeholder="Freunde finden"
          v-model="searchquery"
          :options="otherUsers"
          :option-projection="(e:User) => e.name"
          no-element-message="Keine Benutzer"
        />
      </div>
    </div>
    <div class="pb-5 overflow-auto w-100">
      <div v-for="user of friends" style="border-radius: 0.5rem; background-color: green; margin: 0 auto" class="p-2 w-50 mb-2 text-center">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import * as API from '../API';
import { SelectInput } from 'custom-mbd-components';
import { User } from '../types';
import { currentUser } from '../router';

const error = ref('');
const users = ref<User[]>([]);
const friends = ref<User[]>([]);
const otherUsers = computed(() => users.value.filter(user => !friends.value.find(f => f.id === user.id) && user.id !== currentUser.value?.uid));
const searchquery = ref('');

//getUsers
async function getUsers() {
  try {
    users.value = await API.getUsers();
    console.log(users.value);
  } catch (e: any) {
    error.value = e.message;
  }
}
getUsers();
//getfriends
async function getFriends() {
  try {
    friends.value = await API.getFriends();
  } catch (e: any) {
    error.value = e.message;
  }
}
getFriends();
//add friend
async function addFriend(user: User) {
  try {
    friends.value.push(await API.addFriend(user));
    searchquery.value = '';
  } catch (e: any) {
    error.value = e.message;
  }
}
</script>
