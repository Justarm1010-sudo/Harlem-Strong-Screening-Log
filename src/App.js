import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Welcome to the App</h1>
          <h2>{user ? `Hello, ${user.username}` : 'No User'}</h2>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
