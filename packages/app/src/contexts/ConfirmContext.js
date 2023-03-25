import React, { createContext, useState } from 'react';

export const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const showConfirm = props => {
    setAlertProps(props);
    setShow(true);
  };

  const hideConfirm = () => {
    setShow(false);
  };

  const value = {
    show,
    alertProps,
    showConfirm,
    hideConfirm,
  }

  return (
    <ConfirmContext.Provider value={value}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContext;
