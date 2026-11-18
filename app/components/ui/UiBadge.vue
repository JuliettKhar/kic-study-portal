<template>
  <span class="ui-badge" :class="[`ui-badge--${variant}`, `ui-badge--shape-${shape}`]">
    <span v-if="dot" class="ui-badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<script setup lang="ts">
export type UiBadgeVariant = 'neutral' | 'info' | 'outline' | 'warning' | 'danger'
/** Pill for statuses (Today); tag for meta such as class time and delivery. */
export type UiBadgeShape = 'pill' | 'tag'

withDefaults(
  defineProps<{
    variant?: UiBadgeVariant
    shape?: UiBadgeShape
    dot?: boolean
  }>(),
  {
    variant: 'neutral',
    shape: 'pill',
    dot: false,
  },
)
</script>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid transparent;
  // Dot colour; overridden per variant.
  --ui-badge-accent: currentColor;
  font-family: var(--font-ui);
  font-size: var(--font-size-badge);
  font-weight: 600;
  line-height: 1.6;
  white-space: nowrap;

  &--neutral {
    background: color-mix(in srgb, var(--color-on-surface-variant) 10%, transparent);
    color: var(--color-on-surface-variant);
  }

  &--shape-pill {
    border-radius: var(--radius-full);
  }

  &--shape-tag {
    border-radius: var(--radius-md);
  }

  &__dot {
    flex-shrink: 0;
    width: var(--space-sm);
    height: var(--space-sm);
    border-radius: var(--radius-full);
    background: var(--ui-badge-accent);
  }

  &--info {
    border-color: color-mix(in srgb, var(--color-primary-container) 20%, transparent);
    background: color-mix(in srgb, var(--color-primary-container) 10%, transparent);
    color: var(--color-primary-container);
  }

  &--outline {
    border-color: color-mix(in srgb, var(--color-on-surface-muted) 20%, transparent);
    background: color-mix(in srgb, var(--color-on-surface-muted) 10%, transparent);
    color: var(--color-on-surface-variant);
  }

  &--warning {
    border-color: var(--color-warning-outline);
    background: var(--color-warning-container);
    color: var(--color-on-warning-container);
    --ui-badge-accent: var(--color-warning);
  }

  &--danger {
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    color: var(--color-error);
  }

  @media (max-width: bp.$tablet - 0.02px) {
    padding: 2px var(--space-sm);
  }

  // No type token is this small.
  @media (max-width: bp.$mobile - 0.02px) {
    padding: 2px 6px;
    font-size: 0.625rem;
    line-height: 0.9375rem;
  }
}
</style>
