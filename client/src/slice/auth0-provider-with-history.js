import React from 'react';
import { useHistory, useNavigation } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  // const domain ="dev-hhm8gqfxatb7rl1l.us.auth0.com"
  // const clientId = "N65RTQ5PDoxVwjhSCMReA7An8tO3Egvh";
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

//   const history = useNavigation();

//   const onRedirectCallback = (appState) => {
//     history.push(appState?.returnTo || window.location.pathname);
//   };

  return (
    <Auth0Provider
      // domain={domain}
      // clientId={clientId}
      redirectUri={window.location.origin}
    //   onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;