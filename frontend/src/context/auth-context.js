import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});

//It is like template, which has variables will be used anywhere it is called.
//Login, Logout will be defined in app.js
//also, token, userId too.