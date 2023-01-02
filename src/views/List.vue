<template>
  <div v-if="list" class="text-light d-flex flex-column align-items-center w-100 py-5 contentHeight-75">
    <div class="w-100 px-4" style="display: grid; grid-template-columns: 40px auto 40px; gap: 10px">
      <div></div>
      <h1 class="text-center">{{ list?.name }}</h1>
      <div v-if="list.authorId == currentUser?.uid" class="d-flex justify-content-end align-items-center">
        <control size="40px" style="font-size: 20px; background-color: grey" @click.stop="router.push(`/settings/${listId}`)">
          <i class="fas fa-cog"></i>
        </control>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center w-100 overflow-auto mt-5">
      <div v-for="todo in list?.todos" class="listgrid mb-2 w-100 px-4">
        <h3 class="text-light me-2 mb-0 d-flex align-items-center">{{ todo.name }}</h3>
        <control size="40px" style="font-size: 20px" @click.stop="deleteTodo(todo)"><i class="fas fa-trash"></i></control>
        <control v-if="todo.completed" size="40px" style="font-size: 20px" @click.stop="checkTodo(todo)"><i class="fas fa-check"></i></control>
        <control v-else size="40px" style="font-size: 20px; background-color: red" @click.stop="checkTodo(todo)">
          <i class="fas fa-check"></i>
        </control>
      </div>
    </div>
  </div>
  <div class="addButton d-flex flex-column align-items-center justify-content-center">
    <control class="mb-2" v-if="!doCreate" @click.stop="doCreate = true"><i class="fas fa-plus"></i></control>
    <form v-if="doCreate" @submit.prevent="createTodo()">
      <TextInput placeholder="Name" v-model="newTodoName" required></TextInput>
      <Button class="me-2 mt-2">Erstellen</Button>
      <Button type="button" class="mt-2" @click.stop="doCreate = false">abbrechen</Button>
    </form>
    <Message v-model:success="success" v-model:error="error" />
  </div>
</template>
<style lang="scss">
.listgrid {
  display: grid;
  grid-template-columns: auto 40px 40px;
  gap: 10px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import type { List, Todo } from '../types';
import * as API from '../API';
import { Message, TextInput, Button } from 'custom-mbd-components';
import control from '../components/controlButton.vue';
import router, { currentUser } from '../router';

const list = ref<List | null>(null);
const error = ref('');
const success = ref('');
const listId = window.location.href.split('/').at(-1)!;
const doCreate = ref(false);
const newTodoName = ref('');

async function getCurrentList() {
  try {
    list.value = await API.getList(listId);
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}
getCurrentList();

async function createTodo() {
  try {
    list.value!.todos.push(await API.setTodo(listId, newTodoName.value));
    doCreate.value = false;
    success.value = `"${newTodoName.value}" wurde erstellt.`;
    newTodoName.value = '';
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}

async function deleteTodo(todo: Todo) {
  if (!list.value) return;
  try {
    await API.deleteTodo(todo, listId);
    list.value.todos = list.value.todos.filter((t: Todo) => t.id !== todo.id);
    success.value = `${todo.name} wurde gelöscht.`;
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}

async function checkTodo(todo: Todo) {
  let checkedTodo = { ...todo, completed: !todo.completed, completed_at: new Date().toISOString() };
  try {
    await API.updateTodo(checkedTodo, listId);
    todo.completed = !todo.completed;
  } catch (e: any) {
    console.error(e);
    error.value = e.message;
  }
}
</script>
