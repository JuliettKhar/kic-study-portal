<script setup lang="ts">
// Computed once on the server and reused on hydration, so server/client time zones never disagree.
const currentYear = useState('auth-footer-year', () => new Date().getFullYear())
</script>

<template>
  <div class="auth-layout">
    <AuthBackground />

    <main class="auth-layout__content">
      <slot />
    </main>

    <footer class="auth-layout__footer">
      <p>Version 1.0 Prototype</p>
      <p>&copy; {{ currentYear }} Graduate School of IT. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.auth-layout {
  // Shared by the page card and the background gutters beside it.
  --auth-card-max: 28rem;

  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  padding: var(--space-xl) var(--space-md);
  gap: var(--space-xl);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: url('~/assets/images/login-bg.png') center / cover no-repeat;
    pointer-events: none;
  }

  &__content {
    width: 100%;
    max-width: var(--container-max);
  }

  &__footer {
    width: 100%;
    max-width: 42rem;
    padding-top: var(--space-lg);
    border-top: 1px solid var(--color-outline-subtle);
    color: var(--color-on-surface-faint);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    line-height: 1.25rem;
    text-align: center;

    p {
      margin: 0 0 var(--space-xs);
    }

    @media (max-width: bp.$mobile) {
      font-size: var(--font-size-body-xs);
      line-height: 1.125rem;
    }
  }
}
</style>
