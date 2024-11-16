import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import ScreeningForm from './ScreeningForm'; // Ensure the path is correct

const LoginAndScreening = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Welcome to the Screening Log Portal!</h1>
          <h2>Hello, Data Collector!</h2>
          <button onClick={signOut}>Sign Out</button>

          {/* Render ScreeningForm */}
          <div style={{ marginTop: '20px' }}>
            <ScreeningForm />
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default LoginAndScreening;
