const updateJsonFile = require('update-json-file');
const webPush = require('web-push');
const loadJsonFile = require('load-json-file');


const filePath = './subscribers.json'
const options = { defaultValue: [] }



const vapid = require('../vapid.json');

const testSub = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fnYcmIMKLjE:APA91bFNXlMpXus5xeze3EerVoH2l2vsLR4HkbaqQmo_VavejTSXABhuN9z3KEwBhg7sfovQdZB8n6BJGHibMTXPOL_if828s0XL1lOHWuMdXhQRg_mgNUD49h53CLOvlGJsuGb2dQb-",
  "expirationTime": null,
  "keys": { "p256dh": "BLe-MGpB8oENcQQLt5mUlY4JKptxW1rDJWC9mXJLVJZXgIChW2EA-6RpHzvJgx3Yr-Qb9_-2ZdrVvF0Ck45C9x8", "auth": "S9Lc61UOYm5giyArYRLcUg" }
};
const testSub1 = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/dpYe0OxbTvo:APA91bEVcbprMaDyUoRQH1j9kUCKFLA8Zfp4995oTUUYxmuIMlKt0M88AL9H6v5ooUIA0SJH-5bLrnGcaHFEfWHTEMjpuhXz62SEvbZkc75rtDyVp8bdnPmqrBk7ZoI4zN5wAX-iNjcw",
  "expirationTime": null,
  "keys": { "p256dh": "BK7pmTjhkLwliViBa0W1Rt55uGvoyWTPTou0yZIIdyybCaQ--_aH9T3O7mjTiCeIazW5OssJYFSqVl7KyP12vVs", "auth": "pVKb1QW8vyOm09J3L7XD8Q" }
};
const testSub2 = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/cOE-rLUFQ-0:APA91bGZVBXl-wz5SNrbgYNjEeMbfSIyAsrhuwbg567mFsv6UENlEaucUwfmQd-oRuMOs0xR4b78IOVRI9xO9loAeybylwt5cwkGImiVUn8xi7LiB_4zauKEQV5iXRp9F_VjRENcf490",
  "expirationTime": null,
  "keys": {
    "p256dh": "BMiAWJlcYuZYXbpmqDRrOLocmz1kobKBiOl_oQNj7u3YMq2xCI8AL9LbZXAdCkDAKdw4a5tkqEphXzc3XVs_TSI",
    "auth": "KcBnfQ9XFQmdYOud7cgA3w"
  }
};
// Tell web push about our application server
webPush.setVapidDetails(
  'mailto:kevin@kevinisom.info',
  vapid.publicKey,
  vapid.privateKey
);

module.exports = [
  {
    method: 'POST',
    path: '/send',
    config: {
      handler: (request, h) => {
        return true
      }
    }
  },
  {
    method: 'POST',
    path: '/subscribe',
    config: {
      handler: async (request, h) => {

        const subs = await updateJsonFile(filePath, (data) => {
          // not safe to return `data`, need to return a modified clone
          const newSubs = data.concat();
          newSubs.push(request.payload);
          return newSubs;
        }, options);

        return true
      }
    }
  },
  {
    method: 'GET',
    path: '/send',
    config: {
      handler: async (request, h) => {

        console.log('send the result');
        const json = await loadJsonFile(filePath);
        console.log(json);
        return webPush.sendNotification(testSub2, "This is my test")
      }
    }
  },
];
