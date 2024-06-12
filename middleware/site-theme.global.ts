export default defineNuxtRouteMiddleware(() => {
  if (process.server || process.client) {
    const optTheme = useCookie('optTheme')
    if (!optTheme.value) { optTheme.value = 'light-theme' }
    useHead({ htmlAttrs: { class: optTheme.value } })
  }
})
