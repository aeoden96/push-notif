import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

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

  function subscribeUserToPush() {
    return navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      var subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: btoa(
          'BBX_UUlbRJcmZwDQWPB8qp74aJIWPtORHb_jwkWmenLpxozbE9UiqLW9nQiH2cdER21Hv4kMgYWb6uhEBBRIMBU'
        )
      };
  
      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function(pushSubscription) {
      console.log('PushSubscription: ', JSON.stringify(pushSubscription));
      return pushSubscription;
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={subscribeUserToPush}>Subscribe2</button>
      </header>
    </div>
  );
}

export default App;
