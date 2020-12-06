import React, { useEffect, useState } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { awsconfig } from './constants/aws-exports';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<object>();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {(user as any).username}</div>
          <AmplifySignOut />
      </div>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignIn
          headerText="サインイン"
          slot="sign-in"
          hideSignUp={true}
          submitButtonText="サインイン"
        ></AmplifySignIn>
      </AmplifyAuthenticator>
  );
}

export default AuthStateApp;