<template>
  <NuxtLink to="/" class="app-brand" aria-current-value="false">
    <!-- Also points at the dashboard: the nav item marks the page, not the logo. -->
    <span class="app-brand__tile">
      <Icon name="lucide:graduation-cap" class="app-brand__icon" aria-hidden="true" />
    </span>

    <span v-if="variant === 'short'" class="app-brand__title">
      {{ $t('common.brandShort') }}
    </span>
    <span v-else class="app-brand__text">
      <span class="app-brand__title">{{ $t('common.brandTitle') }}</span>
      <span class="app-brand__subtitle">{{ $t('common.brandSubtitle') }}</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'full' | 'short' }>(), {
  variant: 'full',
})
</script>

<style scoped lang="scss">
.app-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  border-radius: var(--radius-md);
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // Same tile as the login screen.
  // The tile size differs per placement, so the parent can set --app-brand-tile-size.
  &__tile {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: var(--app-brand-tile-size, 2rem);
    height: var(--app-brand-tile-size, 2rem);
    border-radius: var(--radius-md);
    background: var(--color-primary);
    color: var(--color-on-primary);

    // The whole logo is one link.
    .app-brand:hover & {
      background: color-mix(in srgb, var(--color-primary) 88%, var(--color-on-surface));
    }
  }

  &__icon {
    font-size: calc(var(--app-brand-tile-size, 2rem) / 2);
  }

  &__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.3;
  }

  &__title {
    color: var(--color-on-surface-strong);
    font-family: var(--font-ui);
    // One step down from the mockup: the icon tile takes width the design did not budget for.
    font-size: var(--font-size-body-md);
    font-weight: 700;
    white-space: nowrap;
  }

  &__subtitle {
    color: var(--color-on-surface-muted);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-xs);
  }
}
</style>
