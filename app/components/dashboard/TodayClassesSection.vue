<template>
  <UiCard title="本日の授業" icon="lucide:clock">
    <template #actions>
      <UiBadge variant="warning">
        <span class="today-classes__dot" aria-hidden="true" />
        Today
      </UiBadge>
    </template>

    <ul v-if="classes.length > 0" class="today-classes__list">
      <li v-for="item in classes" :key="`${item.period}-${item.title}`">
        <DashboardClassCard :item="item" />
      </li>
    </ul>
    <p v-else class="today-classes__empty">本日の授業はありません</p>
  </UiCard>
</template>

<script setup lang="ts">
import type { TodayClass } from './ClassCard.vue'

defineProps<{ classes: TodayClass[] }>()
</script>

<style scoped lang="scss">
.today-classes {
  &__dot {
    width: var(--space-sm);
    height: var(--space-sm);
    border-radius: var(--radius-full);
    // Follows the badge text colour, so the dot matches whichever variant is used.
    background: currentColor;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__empty {
    margin: 0;
    color: var(--color-on-surface-muted);
    font-family: var(--font-content);
    font-size: var(--font-size-body-sm);
  }
}
</style>
