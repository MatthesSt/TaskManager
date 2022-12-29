<template>
  <button class="controlButton" type="button">
    <slot></slot>
  </button>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.controlButton {
  aspect-ratio: 1;
  width: 100px;
  border-radius: 1rem;
  background-color: green;
  border: none;
  color: white;
  font-size: 2rem;
}
</style>
