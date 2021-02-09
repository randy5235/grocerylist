export const signIn = (userData) => {
  console.log(userData)
  return {
    type: 'SIGN_IN',
    payload: userData,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};