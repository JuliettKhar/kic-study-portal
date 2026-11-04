<script setup lang="ts">
// Keeps `<html lang>` in sync with the active locale (ADR-0004).
// Not `useLocaleHead`: it warns about a missing `baseUrl` on every render, and SEO tags do not apply here.
const { locale, locales } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locales.value.find((item) => item.code === locale.value)?.language,
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
