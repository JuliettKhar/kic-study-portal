<template>
  <div class="auth-background" aria-hidden="true">
    <div
      v-for="(item, index) in FLOATING_ITEMS"
      :key="item.label"
      :class="['auth-background__item', `auth-background__item--${item.side}`]"
      :style="{ '--x': item.x, '--y': item.y, '--float-delay': `${index * -1.2}s` }"
    >
      <span class="auth-background__icon">
        <Icon :name="item.icon" class="auth-background__glyph" />
        <span v-if="item.badge" class="auth-background__badge">{{ item.badge }}</span>
      </span>
      <span class="auth-background__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FloatingItem {
  label: string
  icon: string
  badge?: string
  side: 'left' | 'right'
  // Horizontal position inside the side gutter, measured from the outer edge (0–1).
  x: number
  // Vertical position as a share of the page height.
  y: string
}

// x comes from the 1280x1066 Figma frame (node 204:71) with a 28rem card in the middle.
// y keeps every item beside the card, above the wider capability chips and footer.
// The right column mirrors the left one.
const FLOATING_ITEMS: FloatingItem[] = [
  { label: '時間割', icon: 'lucide:calendar-days', side: 'left', x: 0.58, y: '15%' },
  { label: '履修ルール', icon: 'lucide:book-open', side: 'left', x: 0.36, y: '35%' },
  { label: '今日の授業', icon: 'lucide:calendar-check', side: 'left', x: 0.67, y: '52%' },
  {
    label: 'AIアシスタント',
    icon: 'lucide:bot',
    badge: 'Future',
    side: 'right',
    x: 0.58,
    y: '15%',
  },
  { label: 'Google Meet', icon: 'lucide:video', side: 'right', x: 0.36, y: '35%' },
  { label: 'お知らせ', icon: 'lucide:bell', side: 'right', x: 0.67, y: '52%' },
]
</script>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.auth-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  user-select: none;

  // Free space on each side of the login card (28rem, see pages/login.vue).
  --gutter-width: calc((100% - 28rem) / 2);
  --item-half: 3rem;

  &__item {
    position: absolute;
    top: var(--y);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6rem;
    opacity: 0.4;
    // Negative delays start each item mid-cycle so they never move in sync.
    animation: float 4s ease-in-out var(--float-delay, 0s) infinite alternate;

    // Keep the whole item inside its gutter so it never slides under the card.
    --offset: clamp(
      var(--item-half),
      calc(var(--gutter-width) * var(--x)),
      calc(var(--gutter-width) - var(--item-half))
    );

    &--left {
      left: var(--offset);
      translate: -50% 0;
    }

    &--right {
      right: var(--offset);
      translate: 50% 0;
    }

    // Soft halo behind the icon and label.
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;
      width: 11rem;
      height: 11rem;
      border-radius: var(--radius-full);
      background: radial-gradient(
        circle,
        color-mix(in srgb, var(--color-primary) 18%, var(--color-surface-lowest)) 0%,
        color-mix(in srgb, var(--color-primary) 13%, var(--color-surface-lowest)) 62%,
        transparent 70%
      );
      translate: -50% -50%;
    }
  }

  &__icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 5.5rem;
  }

  &__glyph {
    color: var(--color-primary);
    font-size: 3.5rem;

    // Lucide's default 2px stroke looks heavy at 56px.
    :deep(*) {
      stroke-width: 1.5;
    }
  }

  &__badge {
    position: absolute;
    top: calc(var(--space-xs) * -1);
    right: calc(var(--space-sm) * -1);
    padding: 0.1875rem 0.5625rem;
    border: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
    border-radius: var(--radius-full);
    background: color-mix(in srgb, var(--color-primary) 15%, var(--color-surface-lowest));
    color: var(--color-primary);
    font-family: var(--font-ui);
    font-size: var(--font-size-badge);
    line-height: 1.4;
  }

  &__label {
    color: var(--color-primary);
    font-size: var(--font-size-body-sm);
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
  }

  // Laptop widths up to a 13" MacBook (1440–1470px): shrink items so they fit beside the card.
  @media (max-width: 92rem) {
    &__item {
      scale: 0.75;
    }
  }

  // No room beside a full-width card on mobile.
  @media (max-width: bp.$mobile) {
    &__item {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__item {
      animation: none;
    }
  }
}

// `transform` composes with the `translate` and `scale` used for positioning above.
@keyframes float {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-0.375rem);
  }
}
</style>
