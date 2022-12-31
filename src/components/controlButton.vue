<template>
  <div class="controlButton">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: string;
  }>(),
  {
    size: '100px',
  }
);
const { size } = toRefs(props);
</script>
<style scoped lang="scss">
.controlButton {
  aspect-ratio: 1;
  width: v-bind(size);
  border-radius: 0.5rem;
  background-color: green;
  border: none;
  color: white;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
