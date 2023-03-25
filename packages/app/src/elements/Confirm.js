import React, { useContext } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

import colors from 'app/src/styles/colors';
import ConfirmContext from 'app/src/contexts/ConfirmContext';

const styles = {
  contentContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  overlay: {
    backgroundColor: 'none',
  }
};

const Confirm = props => {
  const { show, alertProps, hideConfirm } = useContext(ConfirmContext);

  if (!show) { return null; }

  return (
    <AwesomeAlert
      show
      title={alertProps.title}
      message={alertProps.message}
      showCancelButton
      showConfirmButton
      onCancelPressed={hideConfirm}
      onConfirmPressed={alertProps.onConfirm}
      onDismiss={hideConfirm}
      contentContainerStyle={styles.contentContainer}
      overlayStyle={styles.overlay}
      cancelButtonColor={colors.disabled}
      confirmButtonColor={alertProps.dangerous ? colors.danger : colors.button}
    />
  );
};

export default Confirm;
