<template>
  <component
    :is="href ? 'a' : 'button'"
    class="ui-button"
    :class="[`ui-button--${variant}`, `ui-button--${size}`, { 'ui-button--block': block }]"
    :href="href"
    :type="href ? undefined : 'button'"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>

<script setup lang="ts">
export type UiButtonVariant = 'primary' | 'outline' | 'danger-outline'
/** `lg` is the page-level call to action; `md` is the in-card default. */
export type UiButtonSize = 'md' | 'lg'

withDefaults(
  defineProps<{
    variant?: UiButtonVariant
    size?: UiButtonSize
    /** Stretches the button to the full width of its container. */
    block?: boolean
    /**
     * Renders a plain `<a>` instead of a `<button>`, so the browser performs a full
     * navigation. For in-app routes use `NuxtLink` rather than this prop.
     */
    href?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    block: false,
    href: undefined,
  },
)
</script>

<style scoped lang="scss">
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid transparent;
  background: none;
  font-family: var(--font-ui);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &--md {
    border-radius: var(--radius-md);
    font-size: var(--font-size-body-sm);
  }

  &--lg {
    min-height: 3rem;
    border-radius: var(--radius-xl);
    font-size: var(--font-size-body-md);
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // `:hover` still matches a disabled button, so hover styles are opted out explicitly.
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background: var(--color-primary);
    color: var(--color-on-primary);

    &:hover:not(:disabled) {
      background: color-mix(in srgb, var(--color-primary) 88%, var(--color-on-surface));
    }
  }

  &--outline {
    border-color: var(--color-outline-variant);
    color: var(--color-on-surface-variant);

    &:hover:not(:disabled) {
      background: var(--color-surface-subtle);
    }
  }

  &--danger-outline {
    border-color: color-mix(in srgb, var(--color-error) 40%, transparent);
    color: var(--color-error);

    &:hover:not(:disabled) {
      background: color-mix(in srgb, var(--color-error) 8%, transparent);
    }

    &:focus-visible {
      outline-color: var(--color-error);
    }
  }
}
</style>
