<template>
  <UiCard :title="$t('dashboard.todayClasses.title')" icon="lucide:clock">
    <template #actions>
      <UiBadge variant="warning" dot>
        {{ $t('dashboard.todayClasses.todayBadge') }}
      </UiBadge>
    </template>

    <ul v-if="classes.length > 0" class="today-classes__list">
      <li v-for="item in classes" :key="`${item.period}-${item.title}`">
        <DashboardClassCard :item="item" />
      </li>
    </ul>
    <p v-else class="today-classes__empty">{{ $t('dashboard.todayClasses.empty') }}</p>
  </UiCard>
</template>

<script setup lang="ts">
import type { TodayClass } from './ClassCard.vue'

defineProps<{ classes: TodayClass[] }>()
</script>

<style scoped lang="scss">
.today-classes {
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
