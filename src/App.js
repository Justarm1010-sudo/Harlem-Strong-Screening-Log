// src/App.js
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginAndScreening from './LoginAndScreening';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <Authenticator>
        <Routes>
          <Route path="/" element={<LoginAndScreening />} />
          <Route path="/screening" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Authenticator>
    </Router>
  );
};

export default App;
