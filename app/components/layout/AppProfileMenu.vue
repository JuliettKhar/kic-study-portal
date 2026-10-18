<template>
  <div ref="root" class="app-profile-menu" @keydown.esc="closeAndFocusTrigger">
    <!-- SSR already resolves the session, so this only shows if it is missing. -->
    <UiSkeleton v-if="!user" width="2.25rem" circle />

    <template v-else>
      <button
        ref="trigger"
        type="button"
        class="app-profile-menu__trigger"
        aria-label="プロフィールメニュー"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        @click="isOpen = !isOpen"
      >
        <UiAvatar :src="user.picture" />
      </button>

      <div v-if="isOpen" :id="panelId" class="app-profile-menu__panel">
        <div class="app-profile-menu__header">
          <UiAvatar :src="user.picture" size="2.75rem" />
          <div class="app-profile-menu__identity">
            <p class="app-profile-menu__name">{{ user.name }}</p>
            <p class="app-profile-menu__email">{{ user.email }}</p>
            <UiBadge 
              v-if="studentNumber" 
              class="app-profile-menu__student-number"
            >
              {{ studentNumber }}
            </UiBadge>
          </div>
        </div>

        <hr class="app-profile-menu__divider" />

        <button
          type="button"
          class="app-profile-menu__item app-profile-menu__item--danger"
          @click="signOut"
        >
          <Icon name="lucide:log-out" class="app-profile-menu__item-icon" />
          ログアウト
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()

const root = useTemplateRef('root')
const trigger = useTemplateRef('trigger')
const panelId = useId()
const isOpen = ref(false)

const studentNumber = computed(() => (user.value ? toStudentNumber(user.value.email) : null))

function closeAndFocusTrigger() {
  if (!isOpen.value) return

  isOpen.value = false
  trigger.value?.focus()
}

// Clicking elsewhere closes the menu without moving focus back to the trigger.
function onDocumentPointerDown(event: PointerEvent) {
  if (event.target instanceof Node && root.value?.contains(event.target)) return

  isOpen.value = false
}

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown))

async function signOut() {
  await clear()
  await navigateTo('/login')
}
</script>

<style scoped lang="scss">
.app-profile-menu {
  position: relative;

  &__trigger {
    display: flex;
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background: none;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  // Level 2 overlay from the design spec: translucent white, backdrop blur, primary-tinted shadow.
  &__panel {
    position: absolute;
    top: calc(100% + var(--space-sm));
    right: 0;
    // No z-index scale exists yet; this only has to clear the page content.
    z-index: 10;
    width: 18rem;
    padding: var(--space-sm);
    border: 1px solid var(--color-outline-subtle);
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--color-surface-lowest) 90%, transparent);
    backdrop-filter: blur(16px);
    box-shadow: var(--shadow-card);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm);
  }

  &__identity {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    min-width: 0;
  }

  &__name {
    margin: 0;
    color: var(--color-on-surface-strong);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    font-weight: 600;
  }

  &__email {
    overflow: hidden;
    margin: 0;
    color: var(--color-on-surface-muted);
    font-size: var(--font-size-body-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__student-number {
    align-self: flex-start;
  }

  &__items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-sm);
    border: none;
    border-radius: var(--radius-md);
    background: none;
    color: var(--color-on-surface-variant);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: -2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--danger {
      color: var(--color-error);

      &:hover {
        background: color-mix(in srgb, var(--color-error) 8%, transparent);
      }

      &:focus-visible {
        outline-color: var(--color-error);
      }
    }
  }

  &__item-icon {
    flex-shrink: 0;
    font-size: 1.125rem;
  }

  &__divider {
    margin: var(--space-sm) 0;
    border: none;
    border-top: 1px solid var(--color-outline-subtle);
  }
}
</style>
