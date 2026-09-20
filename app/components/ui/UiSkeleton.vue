<template>
  <span class="ui-skeleton" :class="{ 'ui-skeleton--circle': circle }" :style="style" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    radius?: string
    circle?: boolean
  }>(),
  {
    width: '100%',
    height: '0.75rem',
    radius: undefined,
    circle: false,
  },
)

const style = computed(() => ({
  width: props.width,
  height: props.circle ? props.width : props.height,
  borderRadius: props.circle ? 'var(--radius-full)' : (props.radius ?? 'var(--radius-md)'),
}))
</script>

<style scoped lang="scss">
.ui-skeleton {
  display: block;
  flex: none;
  background: linear-gradient(
    90deg,
    var(--color-surface-container) 25%,
    var(--color-surface-high) 37%,
    var(--color-surface-container) 63%
  );
  background-size: 400% 100%;
  animation: ui-skeleton-shimmer 1.4s ease infinite;
}

@keyframes ui-skeleton-shimmer {
  from {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-skeleton {
    animation: none;
  }
}
</style>
