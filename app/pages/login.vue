<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const { t } = useI18n()

// Joined here, not in the message: `|` separates plural forms in vue-i18n messages.
useHead({
  title: () => `${t('auth.pageTitle')} | ${t('auth.brandTitle')}`,
})

const CAPABILITIES = [
  { labelKey: 'auth.features.timetable', icon: 'lucide:calendar-days' },
  { labelKey: 'auth.features.googleMeet', icon: 'lucide:video' },
  { labelKey: 'auth.features.courseRules', icon: 'lucide:book-open' },
  { labelKey: 'auth.features.announcements', icon: 'lucide:bell' },
] as const
</script>

<template>
  <div class="login">
    <header class="login__brand">
      <span class="login__brand-tile">
        <Icon name="lucide:graduation-cap" class="login__brand-icon" />
      </span>
      <h1 class="login__brand-title">{{ $t('auth.brandTitle') }}</h1>
    </header>

    <!-- The heading is styled for this page, so it stays in the slot and names the card by id
         rather than going through UiCard's `title` prop. -->
    <UiCard variant="raised" class="login__card" aria-labelledby="login-heading">
      <div class="login__intro">
        <h2 id="login-heading" class="login__heading">{{ $t('auth.welcomeHeading') }}</h2>
        <p class="login__lead">{{ $t('auth.lead') }}</p>
      </div>

      <!-- A full page load, not a router navigation: OAuth is a chain of cross-origin redirects. -->
      <UiButton size="lg" block href="/auth/google" class="login__button">
        <template #icon>
          <img
            class="login__google-mark"
            src="~/assets/images/google-icon.svg"
            alt=""
            width="28"
            height="28"
          />
        </template>
        {{ $t('auth.signInButton') }}
      </UiButton>

      <div class="login__notice">
        <p class="login__notice-title">
          <Icon name="lucide:shield-check" class="login__notice-icon" />
          {{ $t('auth.secureSignInTitle') }}
        </p>
        <p>{{ $t('auth.secureSignInProvider') }}</p>
        <p>{{ $t('auth.secureSignInPassword') }}</p>
      </div>

      <!-- Hidden until a help page exists: "/" is behind the auth middleware and bounces back here. -->
      <!-- <NuxtLink to="/" class="login__help">ログインできない場合</NuxtLink> -->
    </UiCard>

    <section class="login__capabilities" aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading" class="login__capabilities-title">
        {{ $t('auth.capabilitiesHeading') }}
      </h2>
      <ul class="login__chips">
        <li v-for="item in CAPABILITIES" :key="item.labelKey" class="login__chip">
          <Icon :name="item.icon" class="login__chip-icon" />
          {{ $t(item.labelKey) }}
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

  // Surface, radius and shadow come from UiCard's `raised` variant; the page owns the layout.
  &__card {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
    max-width: var(--auth-card-max);
    padding: var(--space-xl) var(--space-lg);
  }

  &__intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
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
    // Keeps full-width lines but avoids a lone 「す。」 on the last one; Japanese breaks
    // between phrases rather than inside words where supported (needs `lang="ja"`).
    text-wrap: pretty;
    word-break: auto-phrase;
  }

  // Sizing, colour and focus come from UiButton; only the sheen is specific to this screen.
  &__button {
    position: relative;
    overflow: hidden;

    // A single sheen crossing the button on hover, rather than a looping gradient
    // that would read as a loading state.
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 20%,
        color-mix(in srgb, var(--color-on-primary) 16%, transparent) 50%,
        transparent 80%
      );
      transform: translateX(-100%);
      transition: transform 0.7s ease;
    }

    &:hover::after {
      transform: translateX(100%);
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

  // TODO: temporary comment
  // &__help {
  //   align-self: center;
  //   color: var(--color-primary);
  //   font-size: var(--font-size-body-sm);
  //   font-weight: 500;
  //   line-height: 1.25rem;
  //   text-decoration: none;

  //   &:hover {
  //     text-decoration: underline;
  //   }

  //   &:focus-visible {
  //     outline: 2px solid var(--color-primary);
  //     outline-offset: 2px;
  //     border-radius: var(--radius-sm);
  //   }
  // }

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

  // Spacing and type from the Figma tablet frame (303:2355).
  @media (max-width: bp.$tablet) {
    gap: var(--space-lg);

    &__button {
      font-size: var(--font-size-body-sm-plus);
    }

    // label-caps from docs/design/design.md.
    &__capabilities-title {
      font-family: var(--font-ui);
      font-size: var(--font-size-label-caps);
      font-weight: 700;
      line-height: 1rem;
      letter-spacing: 0.05em;
    }

    &__card {
      padding: var(--space-lg-plus);
    }

    &__intro {
      gap: var(--space-sm);
    }

    &__capabilities {
      margin-top: var(--space-sm);
      gap: calc(var(--space-sm) + var(--space-xs));
    }

    &__chips {
      gap: var(--space-sm);
    }

    // 34px-tall pill: the 1px border sits outside this padding.
    &__chip {
      padding: calc(var(--space-sm) - 2px) calc(var(--space-md) - 2px);
      line-height: 1.25rem;
    }
  }

  // Spacing and type from the Figma mobile frame (303:2446). The card heading keeps its size.
  // Strictly below 768px: the 768px Figma frame is the tablet layout.
  @media (width < bp.$mobile) {
    gap: var(--space-md);

    &__brand-title {
      font-size: var(--font-size-headline-sm);
    }

    &__lead,
    &__button {
      font-size: var(--font-size-body-sm);
    }

    &__card {
      gap: var(--space-sm);
      padding: var(--space-md);
    }

    &__button {
      margin-top: var(--space-sm);
    }

    &__notice {
      padding: var(--space-sm);
    }

    &__capabilities {
      margin-top: 0;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .login__button::after {
    transition: none;
  }
}
</style>
