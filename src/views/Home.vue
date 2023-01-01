<template>
  <div class="d-flex flex-column justify-content-around align-items-center w-100 py-5" style="height: 100vh">
    <control @click.stop="router.push('/friends')">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <i class="far fa-user"></i>
        <div class="mt-2" style="font-size: 15px">Friends</div>
      </div>
    </control>
    <control @click.stop="router.push('/lists')">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <i class="far fa-list-alt"></i>
        <div class="mt-2" style="font-size: 15px">Lists</div>
      </div>
    </control>
    <control @click.stop="router.push('/settings')">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <i class="fas fa-cogs"></i>
        <div class="mt-2" style="font-size: 15px">Settings</div>
      </div>
    </control>
  </div>
</template>
<script setup lang="ts">
import router from '../router';
import control from '../components/controlButton.vue';
</script>
<style scoped lang="scss"></style>
