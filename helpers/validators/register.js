module.exports = {
  'registerValidator': {
    'firstName': 'required|string',
    'lastName': 'required|string',
    'email': 'required|email',
    'password': 'required|string|min:6',
    'confirmPassword': 'required|string|confirmed',
    'phoneNumber': 'required|string',
  },
};