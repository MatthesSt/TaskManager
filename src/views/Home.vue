<template>
  <div class="d-flex flex-column justify-content-around align-items-center py-5" style="height: 100vh">
    <control @click.stop="router.push('/friends')"><i class="far fa-user"></i></control>
    <control @click.stop="router.push('/lists')"><i class="far fa-list-alt"></i></control>
    <control @click.stop="router.push('/settings')"><i class="fas fa-cogs"></i></control>
  </div>
</template>
<script setup lang="ts">
import router from '../router';
import control from '../components/controlButton.vue';
</script>
<style scoped lang="scss"></style>
