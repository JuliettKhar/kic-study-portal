<template>
  <div class="welcome-section">
    <!-- The name is a slot so it keeps its own styling and each locale can place it. -->
    <i18n-t keypath="dashboard.welcome.heading" tag="h2" class="welcome-section__heading">
      <template #name>
        <span class="welcome-section__name">{{ name }}</span>
      </template>
    </i18n-t>
    <p class="welcome-section__subtitle">{{ $t('dashboard.welcome.subtitle') }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.welcome-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  &__heading {
    // The default h2 margin would add to the gap above and below.
    margin: 0;
    // Desktop (Figma): 700 48/76.8, -1.2px tracking.
    font-size: var(--font-size-display-lg);
    font-weight: 700;
    font-family: var(--font-content);
    color: var(--color-on-surface);
    line-height: 1.6;
    letter-spacing: -1.2px;
    display: flex;
    flex-wrap: wrap;
  }

  // Figma: the name is set in Inter Bold.
  &__name {
    color: var(--color-primary);
    font-family: var(--font-ui);
  }

  &__subtitle {
    // Desktop (Figma 90:8): Noto Sans JP Regular 18/28.8.
    font-size: var(--font-size-body-lg);
    line-height: 1.6;
    font-family: var(--font-content);
    color: var(--color-on-surface-variant);
    margin: 0;
  }

  // Tablet (Figma 303:239): Noto Sans JP Bold 24/32, -0.6px tracking.
  @media (max-width: bp.$tablet - 0.02px) {
    gap: var(--space-xs);

    &__heading {
      font-size: var(--font-size-headline-md);
      line-height: 2rem;
      letter-spacing: -0.6px;
    }

    // Figma: 12px, on a 16px line.
    &__subtitle {
      font-size: var(--font-size-body-xs);
      line-height: 1rem;
    }
  }

  // Mobile (Figma 303:2): Noto Sans JP Bold 20/28, -0.5px tracking.
  @media (max-width: bp.$mobile - 0.02px) {
    gap: 2px;

    &__heading {
      font-size: var(--font-size-headline-sm);
      font-weight: 700;
      line-height: 1.75rem;
      letter-spacing: -0.5px;
    }
  }
}
</style>
