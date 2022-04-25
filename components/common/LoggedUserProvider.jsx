import { createContext } from 'react';
import { verify } from 'jsonwebtoken';
import md5 from 'md5';

const SECRET_KEY = md5('EmChiXemAnhLa_#BanNhauMaThoi');
const LoggedUserContext = createContext();

const LoggedUserProvider = ({ authToken, children }) => {
  const loggedUserContainer =
    authToken !== '' ? verify(authToken, SECRET_KEY) : { logUserId: 'None' };

  return (
    <LoggedUserContext.Provider value={loggedUserContainer}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export { LoggedUserContext, LoggedUserProvider };
