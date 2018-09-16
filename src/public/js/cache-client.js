console.log('cache client');
const register = async () => {
  try {
    const result = await navigator.serviceWorker.register('/cached-sw.js')
    console.log('Service Worker: Registered (Cached SW)');
    console.log('registration result', result);
    console.log('Scope', result.scope);
  } catch (swErr) {
    console.log(`Service Worker: (Cached SW): Error: ${swErr}`)
  }
}
if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  register().then(() => console.log('Cached SW'));
} else {
  console.warn('Service Workers are not supported');
}
