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

const Confirm = props => {
  const {
    title, message, show, setShow, onConfirm, dangerous, ...alertProps
  } = props;

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
      confirmButtonColor={dangerous ? colors.danger : colors.button}
    />
  );
};

export default Confirm;
