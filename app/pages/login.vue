<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'ログイン | KIC Student Dashboard',
})

const CAPABILITIES = [
  { label: '時間割', icon: 'lucide:calendar-days' },
  { label: 'Google Meet', icon: 'lucide:video' },
  { label: '履修ルール', icon: 'lucide:book-open' },
  { label: 'お知らせ', icon: 'lucide:bell' },
] as const
</script>

<template>
  <div class="login">
    <header class="login__brand">
      <span class="login__brand-tile">
        <Icon name="lucide:graduation-cap" class="login__brand-icon" />
      </span>
      <h1 class="login__brand-title">KIC Student Dashboard</h1>
    </header>

    <!-- TODO: replace with UiCard / UiButton once #2 lands. -->
    <section class="login__card" aria-labelledby="login-heading">
      <h2 id="login-heading" class="login__heading">KIC学生ポータルへようこそ</h2>
      <p class="login__lead">
        授業スケジュール、Google Meetのリンク、履修ルールなどの学習情報を一つの画面で確認できます。
      </p>

      <!-- Sign-in behaviour is out of scope here; see #3. -->
      <button type="button" class="login__button">
        <img
          class="login__google-mark"
          src="~/assets/images/google-icon.svg"
          alt=""
          width="28"
          height="28"
        />
        KIC Googleアカウントでログイン
      </button>

      <div class="login__notice">
        <p class="login__notice-title">
          <Icon name="lucide:shield-check" class="login__notice-icon" />
          安全なログイン
        </p>
        <p>KICが提供する認証システムを利用してログインします。</p>
        <p>パスワードは本システムに保存されません。</p>
      </div>

      <NuxtLink to="/" class="login__help">ログインできない場合</NuxtLink>
    </section>

    <section class="login__capabilities" aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading" class="login__capabilities-title">このシステムでできること</h2>
      <ul class="login__chips">
        <li v-for="item in CAPABILITIES" :key="item.label" class="login__chip">
          <Icon :name="item.icon" class="login__chip-icon" />
          {{ item.label }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg-plus);
  line-break: strict;
  text-align: center;

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  &__brand-tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-lg);
    background: var(--color-primary);
    color: var(--color-on-primary);
  }

  &__brand-icon {
    font-size: 1.375rem;
  }

  &__brand-title {
    margin: 0;
    color: var(--color-primary);
    font-family: var(--font-ui);
    font-size: var(--font-size-headline-md);
    font-weight: 700;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
    max-width: var(--auth-card-max);
    padding: var(--space-xl) var(--space-lg);
    border-radius: var(--radius-lg);
    background: var(--color-surface-lowest);
    box-shadow: var(--shadow-card);
  }

  &__heading {
    margin: 0;
    font-family: var(--font-ui);
    font-size: var(--font-size-headline-sm);
    font-weight: 700;
    line-height: 1.4;
  }

  &__lead {
    margin: 0;
    color: var(--color-on-surface-muted);
    font-size: var(--font-size-body-sm-plus);
    line-height: 1.6;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    min-height: 3rem;
    border: none;
    border-radius: var(--radius-xl);
    background: var(--color-primary);
    color: var(--color-on-primary);
    font-family: var(--font-ui);
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: color-mix(in srgb, var(--color-primary) 88%, var(--color-on-surface));
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__google-mark {
    flex-shrink: 0;
  }

  &__notice {
    padding: var(--space-md);
    border-radius: var(--radius-md);
    background: var(--color-surface-subtle);
    color: var(--color-on-surface-muted);
    font-size: var(--font-size-body-xs);
    line-height: 1.5;
    text-align: left;

    p {
      margin: 0;
    }
  }

  &__notice-icon {
    flex-shrink: 0;
    color: var(--color-on-surface-variant);
    font-size: 1.25rem;
  }

  &__notice-title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding-bottom: var(--space-xs);
    color: var(--color-on-surface-strong);
    font-size: var(--font-size-body-sm);
    font-weight: 700;
  }

  &__help {
    align-self: center;
    color: var(--color-primary);
    font-size: var(--font-size-body-sm);
    font-weight: 500;
    line-height: 1.25rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }

  &__capabilities {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  &__capabilities-title {
    margin: 0;
    font-size: var(--font-size-body-md);
    font-weight: 500;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-md);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-lg);
    border: 1px solid var(--color-outline-subtle);
    border-radius: var(--radius-full);
    background: var(--color-surface-lowest);
    box-shadow: var(--shadow-chip);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    font-weight: 500;
  }

  &__chip-icon {
    color: var(--color-primary);
    font-size: 1.25rem;
  }

  // One step down the type scale on phones.
  @media (max-width: bp.$mobile) {
    &__brand-title {
      font-size: var(--font-size-headline-sm);
    }

    &__heading {
      font-size: var(--font-size-body-lg);
    }

    &__lead,
    &__button,
    &__capabilities-title {
      font-size: var(--font-size-body-sm);
    }
  }
}
</style>
