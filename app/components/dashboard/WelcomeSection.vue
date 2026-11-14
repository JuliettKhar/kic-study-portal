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
.welcome-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  &__heading {
    font-size: var(--font-size-headline-md);
    font-family: var(--font-content);
    color: var(--color-on-surface);
    line-height: var(--font-size-headline-md);
    display: flex;
    flex-wrap: wrap;
  }

  &__name {
    color: var(--color-primary);
  }

  &__subtitle {
    font-size: var(--font-size-body-md);
    font-family: var(--font-content);
    color: var(--color-on-surface-variant);
    margin: 0;
  }
}
</style>
