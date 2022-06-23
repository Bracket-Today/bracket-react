import React from 'react';
import { View, Text, Button } from 'react-native';
import config from 'app/src/config';

export const sendError = ({ error, user }) => {
  const environment =
    process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV;

  let tags = [environment];
  if (process.env.REACT_APP_ISSUE_TAGS) {
    tags = [...tags, ...process.env.REACT_APP_ISSUE_TAGS.split(',')];
  }

  let storage = {};

  // TODO Native support
  if ('undefined' !== typeof(localStorage)) {
    Object.keys(localStorage).forEach((key) => {
      storage[key] = localStorage.getItem(key);
    });
  }

  fetch(config.pti?.issueUrl || 'https://preflighttech.com/api/1/issues', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.pti.token,
    },
    body: JSON.stringify({
      issue: {
        tags,
        issue_type: 'react',
        app: {
          ...config.app,
          environment,
        },
        exception_name: error.name,
        exception_message: error.message,
        backtrace: error.stack,

        user_name: user?.fullName,
        user_email: user?.email,
        user_type: (user?.userType || user?.__typename),
        user_id: user?.id,

        request_id: storage['X-Request-Id'],

        referrer: window.document?.referrer,
        url: window.document?.documentURI,

        request_at: new Date(),

        request_data: {
          user_agent: window.navigator.userAgent,
          width: window.innerWidth,
          height: window.innerHeight,
          local_storage: storage,
        }
      }
    })
  });
};

export const ErrorMessage = ({ message }) => {
  return (
    <View>
      <Text>
        An error has occurred. We have been notified.
      </Text>

      <Text>{message}</Text>

      {window.location && (
        <Button
          onClick={() => window.location.assign('/')}
          title="Return to Home Screen"
        />
      )}
    </View>
  );
};

const ErrorMessageAndSendError = ({ error }) => {
  sendError({ error });

  return <ErrorMessage message={error.message} />;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.error) {
      return <ErrorMessageAndSendError error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
