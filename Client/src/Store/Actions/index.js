import axios from 'axios';
import history from '../../history';
axios.defaults.withCredentials = true;

export const signIn = (id, pwd) => async (dispatch) => {
  const response = await axios.post("http://localhost:5000/api/login", {
    email: id,
    password: pwd,
  });
  
  dispatch({
    type: "SIGN_IN",
    payload: response.headers,
  });
  history.push('/dashboard')
};

export const fetchChats = () => async (dispatch) => {
  
  const response = await axios.get("http://localhost:5000/api/dashboard");
  dispatch({
    type: "DATA",
    payload: response.data,
  });
  // console.log(response.data);
  // history.push('/dashboard')
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const register = (props) => async (dispatch) => {
  const response = await axios.post("http://localhost:5000/api/register",{
    email: props.email,
    name:props.name,
    password: props.password,
  });
  dispatch({
    type: "REGISTER",
    payload: response.headers,
  });
};
