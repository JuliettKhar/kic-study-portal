<template>
  <header class="app-top-bar">
    <div class="app-top-bar__search">
      <Icon name="lucide:search" class="app-top-bar__search-icon" aria-hidden="true" />
      <input
        type="search"
        class="app-top-bar__search-input"
        placeholder="Search..."
        aria-label="検索"
      />
    </div>

    <div class="app-top-bar__actions">
      <button type="button" class="app-top-bar__icon-button" aria-label="通知">
        <Icon name="lucide:bell" aria-hidden="true" />
      </button>
      <!-- #20: the language switcher goes here, next to the profile menu. -->
      <LayoutAppProfileMenu />
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-outline-variant);
  background: var(--color-surface-lowest);

  &__search {
    position: relative;
    width: 16rem;
  }

  &__search-icon {
    position: absolute;
    top: 50%;
    left: var(--space-sm);
    // Clicks pass through to the input underneath.
    pointer-events: none;
    color: var(--color-on-surface-muted);
    font-size: 1.125rem;
    transform: translateY(-50%);
  }

  &__search-input {
    width: 100%;
    appearance: none;
    padding: var(--space-sm) var(--space-md) var(--space-sm) var(--space-xl);
    border: 1px solid transparent;
    border-bottom-width: 2px;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    background: var(--color-surface-low);
    color: var(--color-on-surface);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    transition: border-bottom-color 0.2s;

    &::placeholder {
      color: var(--color-on-surface-muted);
    }

    // design.md: the bottom border turns primary on focus.
    &:focus {
      outline: none;
      border-bottom-color: var(--color-primary);
    }
  }

  &__icon-button {
    display: flex;
    padding: var(--space-sm);
    border: none;
    border-radius: var(--radius-xl);
    background: none;
    color: var(--color-on-surface-variant);
    font-size: 1.25rem;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-left: auto;
  }
}
</style>
