import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect, lazy, Suspense } from 'react';

//components
import UserProvider from './context/UserProvider';
import AccountProvider from './context/AccountProvider';

import Loader from './components/loader/Loader';



const Messenger = lazy(() => import('./components/Messenger'));

function App() {


  const clientId = '870527656605-q81ig1oastpkne6ul5acg61706htk7b7.apps.googleusercontent.com';




  return (
    <GoogleOAuthProvider clientId={clientId}> 
      <UserProvider>
        <AccountProvider>
          <Suspense fallback={<Loader />}>
              <Messenger /> // Render the Messenger component after the delay
          </Suspense>
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
