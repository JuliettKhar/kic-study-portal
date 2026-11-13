<template>
  <article class="class-card">
    <div class="class-card__body">
      <div class="class-card__badges">
        <UiBadge variant="neutral">{{ item.period }} {{ item.time }}</UiBadge>
        <UiBadge :variant="delivery.variant">{{ delivery.label }}</UiBadge>
      </div>

      <h3 class="class-card__title">{{ item.title }}</h3>

      <div class="class-card__meta">
        <span class="class-card__meta-item">
          <Icon name="lucide:user" class="class-card__meta-icon" aria-hidden="true" />
          {{ item.teacher }}
        </span>
        <span class="class-card__meta-item">
          <Icon name="lucide:door-open" class="class-card__meta-icon" aria-hidden="true" />
          {{ item.room }}
        </span>
      </div>
    </div>

    <div class="class-card__actions">
      <UiButton v-if="item.delivery === 'online' && item.meetUrl" :href="item.meetUrl">
        <template #icon>
          <Icon name="lucide:video" aria-hidden="true" />
        </template>
        Meet
      </UiButton>
      <UiButton v-if="item.syllabusUrl" variant="outline" :href="item.syllabusUrl">
        シラバス
      </UiButton>
    </div>
  </article>
</template>

<script setup lang="ts">
export type ClassDelivery = 'online' | 'classroom'

export interface TodayClass {
  /** Period label, e.g. `2限`. */
  period: string
  /** Time range, e.g. `10:45-12:15`. */
  time: string
  delivery: ClassDelivery
  title: string
  teacher: string
  room: string
  /** Real Meet and syllabus links arrive with the schedule data in #16. */
  meetUrl?: string
  syllabusUrl?: string
}

const props = defineProps<{ item: TodayClass }>()

// Labels stay inline until #20.
const DELIVERY = {
  online: { label: 'Online', variant: 'info' },
  classroom: { label: 'Classroom', variant: 'outline' },
} as const

const delivery = computed(() => DELIVERY[props.item.delivery])
</script>

<style scoped lang="scss">
.class-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-md);
  border: 1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent);
  border-radius: var(--radius-xl);
  background: var(--color-surface);

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    // Lets a long title shrink and wrap instead of pushing the actions out of the card.
    min-width: 0;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &__title {
    margin: var(--space-xs) 0 0;
    color: var(--color-on-surface);
    font-family: var(--font-content);
    font-size: var(--font-size-headline-sm);
    font-weight: 600;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs) var(--space-md);
    margin-top: var(--space-xs);
    color: var(--color-on-surface-variant);
    font-family: var(--font-content);
    font-size: var(--font-size-body-sm);
  }

  &__meta-item {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }

  &__meta-icon {
    flex-shrink: 0;
    font-size: var(--font-size-body-xs);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: var(--space-sm);
  }
}
</style>
