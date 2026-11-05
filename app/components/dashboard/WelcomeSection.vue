<template>
  <div class="welcome-section">
    <h2 class="welcome-section__heading">
      おかえりなさい,&nbsp; <span class="welcome-section__name">{{ name }}</span>
    </h2>
    <p class="welcome-section__subtitle">今日のスケジュールとタスクの概要です。</p>
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
}

.welcome-section__heading {
  font-size: var(--font-size-headline-md);
  font-family: var(--font-content);
  color: var(--color-on-surface);
  line-height: var(--font-size-headline-md);
  display: flex;
  flex-wrap: wrap;

  .welcome-section__name {
    color: var(--color-primary);
  }
}

.welcome-section__subtitle {
  font-size: var(--font-size-body-md);
  font-family: var(--font-content);
  color: var(--color-on-surface-variant);
  margin: 0;
}
</style>
