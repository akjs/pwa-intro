console.log('client');

const applicationServerPublicKey = 'BOjZjR0OL7GF6oDVHcxfmvzy6UhHYedF8R6xZh9j22VpkTZbYR5Dk8-g9JTFSJsyHeKk9jPfdOGI70ynAUG5DTo';

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const registerWorker = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    navigator.serviceWorker.register('notification-worker.js')
      .then((swReg) => {
        console.log('Notification Service Worker is registered', swReg);
        swRegistration = swReg;
        swReg.update();
        initializeUI();
        return;
      })
      .catch(function (error) {
        console.error('Service Worker Error', error);
      });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
}
function initializeUI() {

  const pushButton = document.querySelector('.push-btn');

  if (pushButton === null) return;
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then((subscription) => {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
}
function updateBtn() {

  const pushButton = document.querySelector('.push-btn');

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then((subscription) => {
      console.log('User is subscribed.', subscription);

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();
    })
    .catch((err) => {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
}
function updateSubscriptionOnServer(subscription) {
  console.log('sub', subscription);
  if (subscription === null) return;
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  fetch("/subscribe",
    {
      method: "POST",
      body: JSON.stringify(subscription),
      headers
    }).then(() => {
      const subscriptionJson = document.querySelector('.subscription-json');
      const subscriptionDetails =
        document.querySelector('.subscription-details');

      if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
      } else {
        subscriptionDetails.classList.add('is-invisible');
      }
    });

}
document.addEventListener('DOMContentLoaded', registerWorker);