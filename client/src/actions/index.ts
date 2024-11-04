export const signIn = (userData: any) => {
  console.log("test: ", userData);
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

export const fetchLists = async () => {
    const response = await fetch('http://localhost/api/list/lists', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
}