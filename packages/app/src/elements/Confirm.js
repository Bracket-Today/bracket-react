import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from 'app/src/styles/colors';

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

const Confirm = ({ title, message, show, setShow, onConfirm }) => {
  if (!show) { return null; }

  return (
    <AwesomeAlert
      show
      title={title}
      message={message}
      showCancelButton
      showConfirmButton
      onCancelPressed={() => setShow(false)}
      onConfirmPressed={onConfirm}
      onDismiss={() => setShow(false)}
      contentContainerStyle={styles.contentContainer}
      overlayStyle={styles.overlay}
      cancelButtonColor={colors.disabled}
      confirmButtonColor={colors.button}
    />
  );
};

export default Confirm;
