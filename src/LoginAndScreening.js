// src/LoginAndScreening.js
import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import ScreeningForm from './ScreeningForm';
//change to sign in hook state only for authenticator 
const LoginAndScreening = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, Data Collector!</h2>
          <button onClick={signOut}>Sign Out</button>
          <ScreeningForm />
        </div>
      ) : (
        <div>
          <h1>Please log in to access the screening form</h1>
        </div>
      )}
    </div>
  );
};

export default LoginAndScreening;
