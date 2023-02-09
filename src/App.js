import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import firebaseApp, {getFirebaseToken, onForegroundMessage} from "./firebase";

function App() {
  const [token, setToken] = React.useState(null);
  const [receivedMessage, setReceivedMessage] = React.useState(0);

  

  const requestPermission = () => {
    console.log('Requesting permission...');
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        // Handling deprecated version with callback.
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('Permission not granted.');
      }
    });
  }

  useEffect(() => {
    requestPermission();
    
  }, []);


  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log('Received foreground message: ', payload);
        setReceivedMessage(receivedMessage + 1);
      })
      .catch(err => console.log('An error occured while retrieving foreground message. ', err));
  }, [receivedMessage]);

  // function subscribeUserToPush() {
    // return navigator.serviceWorker.register('service-worker.js').then(function(registration) {
    //   var subscribeOptions = {
    //     userVisibleOnly: true,
    //     applicationServerKey: ""
    //   };
  
    //   return registration.pushManager.subscribe(subscribeOptions);
    // })
    // .then(function(pushSubscription) {
    //   console.log('PushSubscription: ', JSON.stringify(pushSubscription));
    //   return pushSubscription;
    // });


  // }

  const subscribeUserToPush = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        alert('Firebase token: ' + firebaseToken);
        if (firebaseToken) {
          setToken(firebaseToken);
          console.log(firebaseToken);
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {token}
        </p>
        <button onClick={subscribeUserToPush}>Subscribe</button>
      </header>
    </div>
  );
}

export default App;
