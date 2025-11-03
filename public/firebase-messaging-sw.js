// // firebase-messaging-sw.js

// // Import Firebase scripts (compat version)
// importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// // Firebase configuration (hardcode env values here)
// firebase.initializeApp({
//   apiKey: "AIzaSyDLDK-WcAG3FDE1izGGC5DHi6gX2rOlf1I",
//   authDomain: "pet-nest-65614.firebaseapp.com",
//   projectId: "pet-nest-65614",
//   storageBucket: "pet-nest-65614.firebasestorage.app",
//   messagingSenderId: "469261923605",
//   appId: "1:469261923605:web:1f1170d7a08e675073251c",
// });

// // Retrieve Firebase Messaging instance
// const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   const notificationTitle = payload.notification?.title || 'Pet Nest';
//   const notificationOptions = {
//     body: payload.notification?.body || '',
//     icon: '/logo.png',
//     data: { url: payload.data?.url || '/' } // optional URL for redirection
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // Handle notification clicks
// self.addEventListener('notificationclick', (event) => {
//   event.notification.close();
//   const url = event.notification.data.url || '/';
//   event.waitUntil(clients.openWindow(url));
// });









// firebase-messaging-sw.js

// Import Firebase scripts (compat version)
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyDLDK-WcAG3FDE1izGGC5DHi6gX2rOlf1I",
  authDomain: "pet-nest-65614.firebaseapp.com",
  projectId: "pet-nest-65614",
  storageBucket: "pet-nest-65614.firebasestorage.app",
  messagingSenderId: "469261923605",
  appId: "1:469261923605:web:1f1170d7a08e675073251c",
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification?.title || 'Pet Nest';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/logo.png',
    data: {
      // Save the URL from webpush.fcmOptions.link
      url: payload.fcmOptions?.link || payload.data?.url || '/',
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Focus an open tab with the same URL if exists
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new tab
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
