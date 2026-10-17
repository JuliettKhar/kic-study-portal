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
        <img v-if="user.picture" :src="user.picture" alt="" class="app-profile-menu__avatar" />
        <Icon v-else name="lucide:user" class="app-profile-menu__avatar-fallback" />
      </button>

      <div v-if="isOpen" :id="panelId" class="app-profile-menu__panel">
        <div class="app-profile-menu__header">
          <p class="app-profile-menu__name">{{ user.name }}</p>
          <p class="app-profile-menu__email">{{ user.email }}</p>
            <UiBadge class="app-profile-menu__student-number">{{ studentNumber }}</UiBadge>
        </div>

        <hr class="app-profile-menu__divider" />

        <button type="button" class="app-profile-menu__sign-out" @click="signOut">
          <Icon name="lucide:log-out" class="app-profile-menu__sign-out-icon" />
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
