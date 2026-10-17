<template>
  <img v-if="src" :src="src" alt="" class="ui-avatar" :style="{ width: size, height: size }" />
  <span v-else class="ui-avatar ui-avatar--fallback" :style="{ width: size, height: size }">
    <Icon name="lucide:user" />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ src?: string; size?: string }>(), {
  src: undefined,
  size: '2.25rem',
})
</script>

<style scoped lang="scss">
.ui-avatar {
  flex-shrink: 0;
  border-radius: var(--radius-full);
  object-fit: cover;

  &--fallback {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-container);
    color: var(--color-on-surface-variant);
  }
}
</style>
