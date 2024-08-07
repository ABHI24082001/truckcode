// api.js
import axios from 'axios';

const API_URL = 'https://salvendor.tranzol.com/API/LoginAPI/Authenticate';

export const login = async (username, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        UserName: username,
        Password: password,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login API error: ', error);
    throw error;
  }
};
