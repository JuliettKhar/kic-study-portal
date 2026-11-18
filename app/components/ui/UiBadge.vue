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
@use '~/assets/styles/tokens/breakpoints' as bp;

.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  // Figma 90:43: 4px × 8px on desktop; tablet and mobile are tighter (below).
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-family: var(--font-ui);
  font-size: var(--font-size-badge);
  font-weight: 600;
  // Figma: 11/17.6. Set explicitly so the badge does not take the body line-height.
  line-height: 1.6;
  white-space: nowrap;

  &--neutral {
    background: color-mix(in srgb, var(--color-on-surface-variant) 10%, transparent);
    color: var(--color-on-surface-variant);
  }

  // Delivery badges (Online / Classroom) are tags, not pills.
  &--info {
    border-color: color-mix(in srgb, var(--color-primary-container) 20%, transparent);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--color-primary-container) 10%, transparent);
    color: var(--color-primary-container);
  }

  &--outline {
    border-color: color-mix(in srgb, var(--color-on-surface-muted) 20%, transparent);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--color-on-surface-muted) 10%, transparent);
    color: var(--color-on-surface-variant);
  }

  &--warning {
    border-color: var(--color-warning-outline);
    background: var(--color-warning-container);
    color: var(--color-on-warning-container);
  }

  &--danger {
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    color: var(--color-error);
  }

  // Tablet (Figma 303:239): 2px × 8px.
  @media (max-width: bp.$tablet - 0.02px) {
    padding: 2px var(--space-sm);
  }

  // Mobile (Figma 303:2): Inter Semi Bold 10/15, 2px × 6px padding. No type token is this small.
  @media (max-width: bp.$mobile - 0.02px) {
    padding: 2px 6px;
    font-size: 0.625rem;
    line-height: 0.9375rem;
  }
}
</style>
