<template>
  <img v-if="src" :src="src" alt="" class="ui-avatar" :style="sizeStyle" />
  <span v-else class="ui-avatar ui-avatar--fallback" :style="sizeStyle">
    <Icon name="lucide:user" />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string
    /** Fixed size. Without it the avatar follows `--ui-avatar-size`, so a parent can resize it per breakpoint. */
    size?: string
  }>(),
  {
    src: undefined,
    size: undefined,
  },
)

const sizeStyle = computed(() =>
  props.size ? { width: props.size, height: props.size } : undefined,
)
</script>

<style scoped lang="scss">
.ui-avatar {
  flex-shrink: 0;
  width: var(--ui-avatar-size, 2.25rem);
  height: var(--ui-avatar-size, 2.25rem);
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
