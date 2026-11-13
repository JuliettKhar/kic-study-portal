<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <div class="dashboard__greeting">
        <UiSkeleton width="22rem" height="2.5rem" radius="var(--radius-lg)" />
        <UiSkeleton width="16rem" />
      </div>

      <div class="dashboard__stats">
        <div v-for="stat in STAT_COUNT" :key="stat" class="dashboard__stat">
          <UiSkeleton width="1.5rem" circle />
          <div class="dashboard__stat-text">
            <UiSkeleton width="1.5rem" height="1.25rem" />
            <UiSkeleton width="4.5rem" height="0.625rem" />
          </div>
        </div>
      </div>
    </header>

    <div class="dashboard__grid">
      <div class="dashboard__column">
        <DashboardTodayClassesSection :classes="TODAY_CLASSES" />
        <UiPlaceholderCard title-width="10rem" :lines="4" />
      </div>

      <div class="dashboard__column">
        <UiPlaceholderCard title-width="7rem" :lines="4" />
        <UiPlaceholderCard title-width="9rem" :lines="6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodayClass } from '~/components/dashboard/ClassCard.vue'

definePageMeta({
  middleware: 'auth',
})

const STAT_COUNT = 2

// Mock data from the dashboard mockup. Real schedule data and links arrive in #16.
const TODAY_CLASSES: TodayClass[] = [
  {
    period: '2限',
    time: '10:45-12:15',
    delivery: 'online',
    title: '情報ネットワーク特論',
    teacher: '石野先生',
    room: 'Room 402',
    meetUrl: '#',
    syllabusUrl: '#',
  },
  {
    period: '3限',
    time: '13:00-14:30',
    delivery: 'classroom',
    title: 'ソフトウェア工学',
    teacher: '田中先生',
    room: 'Room 305',
    syllabusUrl: '#',
  },
]
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-lg);
  }

  &__greeting {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  &__stats {
    display: flex;
    gap: var(--space-md);
  }

  &__stat {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    border: 1px solid var(--color-outline-variant);
    border-radius: var(--radius-xl);
    background: var(--color-surface-lowest);
  }

  &__stat-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: var(--space-lg);
    align-items: start;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    min-width: 0;
  }
}

@media (max-width: 60rem) {
  .dashboard__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
