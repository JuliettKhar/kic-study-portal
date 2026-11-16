<!--
  Development-only manual check for the Google API client (#37). Removed from production
  routes in nuxt.config.ts; the API it calls answers 404 outside development.
  Open with a full page load: the `SSR` line is fetched during server rendering.
-->
<script setup lang="ts">
const route = useRoute()

// Runs during SSR on a full page load: proves $api forwards the session cookie.
const { data: ssr, error: ssrError } = await useFetch('/api/debug/google', {
  $fetch: useNuxtApp().$api,
  query: { expire: route.query.expire },
})

const result = ref('')

async function call(query: string) {
  try {
    result.value = JSON.stringify(await useNuxtApp().$api(`/api/debug/google${query}`))
  } catch (error) {
    result.value = String(error)
  }
}

// Each call must be rejected by the $api guard before any request is sent.
async function blocked(url: string, options: Record<string, unknown> = {}) {
  try {
    await useNuxtApp().$api(url, options)
    result.value = `NOT BLOCKED: ${url}`
  } catch (error) {
    result.value = `${url} → ${String(error)}`
  }
}
</script>

<template>
  <div style="padding: 24px; display: grid; gap: 8px; max-width: 480px">
    <p>SSR: {{ ssrError ? String(ssrError) : JSON.stringify(ssr) }}</p>
    <button @click="call('')">call</button>
    <button @click="call('?expire=1')">call with expired token</button>
    <!-- Expected: "$api only calls the app's own /api routes" for each. -->
    <button @click="blocked('https://example.com/api/x')">blocked: other host</button>
    <button @click="blocked('/auth/google')">blocked: not /api/</button>
    <button @click="blocked('/api/debug/google', { baseURL: 'https://example.com' })">
      blocked: other baseURL
    </button>
    <pre>{{ result }}</pre>
  </div>
</template>
