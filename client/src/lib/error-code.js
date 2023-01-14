export const getMessageFromErrorCode = (code) => {
  const errorCode = code.replace('auth/', '');
  // switch (errorCode) {
  //   case 'auth/invalid-email':
  //     return 'Your email address appears to be malformed!';
  //   case 'auth/wrong-password':
  //     return 'Your password is wrong!';
  //   case 'auth/user-not-found':
  //     return "User with this email doesn't exist!";
  //   case 'auth/invalid-disabled-field':
  //     return 'The provided value for the disabled user property is invalid. It must be a boolean!';
  //   case 'auth/invalid-display-name':
  //     return 'The provided value for the user name is invalid!';
  //   case 'auth/operation-not-allowed':
  //     return 'Signing in with Email and Password is not enabled!';
  //   case 'auth/email-already-exists':
  //     return 'User with this email already exists!';
  //   case 'auth/internal-error':
  //     return 'Something went wrong. Try again later!';
  //   default:
  //     return 'An undefined error happened. Try again later!';
  // }

  switch (errorCode) {
    case 'ERROR_EMAIL_ALREADY_IN_USE':
    case 'account-exists-with-different-credential':
    case 'email-already-in-use':
      return 'Email already used. Go to login page.';
    case 'ERROR_WRONG_PASSWORD':
    case 'wrong-password':
      return 'Wrong email/password combination.';
    case 'ERROR_USER_NOT_FOUND':
    case 'user-not-found':
      return 'No user found with this email.';
    case 'ERROR_USER_DISABLED':
    case 'user-disabled':
      return 'User disabled.';
    case 'ERROR_TOO_MANY_REQUESTS':
    case 'too-many-requests':
      return 'Too many requests to log into this account.';
    case 'ERROR_INVALID_EMAIL':
    case 'invalid-email':
      return 'Email address is invalid.';
    default:
      return 'An undefined error happened. Try again later!';
  }
};
