// MyContext.js
import { createContext, useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const basename = '/example'; // Define the value you want to provide
  return <MyContext.Provider value={{ basename }}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  return useContext(MyContext);
};
