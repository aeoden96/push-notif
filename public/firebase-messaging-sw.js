importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCKdZ8ZiLAXgaKsGQOLXet_Oh2g72fAgOg",
  authDomain: "festiniboats.firebaseapp.com",
  projectId:"festiniboats",
  storageBucket: "festiniboats.appspot.com",
  messagingSenderId: "942137484492",
  appId: "1:942137484492:web:9f5ed7be35374faf3f4e69",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});