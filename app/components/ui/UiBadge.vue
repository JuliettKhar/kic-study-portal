<template>
  <span class="ui-badge" :class="`ui-badge--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
export type UiBadgeVariant = 'neutral' | 'info' | 'outline' | 'warning' | 'danger'

withDefaults(defineProps<{ variant?: UiBadgeVariant }>(), {
  variant: 'neutral',
})
</script>

<style scoped lang="scss">
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  // The design calls for 2px vertical padding, which has no token of its own.
  padding: calc(var(--space-xs) / 2) var(--space-xs);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-family: var(--font-ui);
  font-size: var(--font-size-badge);
  font-weight: 600;
  // Without this the badge inherits the body line-height and grows past the spec height.
  line-height: 1;
  white-space: nowrap;

  &--neutral {
    background: color-mix(in srgb, var(--color-on-surface-variant) 10%, transparent);
    color: var(--color-on-surface-variant);
  }

  &--info {
    background: color-mix(in srgb, var(--color-info) 10%, transparent);
    color: var(--color-info);
  }

  &--outline {
    border-color: var(--color-outline-variant);
    color: var(--color-on-surface-variant);
  }

  &--warning {
    background: color-mix(in srgb, var(--color-warning) 10%, transparent);
    color: var(--color-warning);
  }

  &--danger {
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    color: var(--color-error);
  }
}
</style>
