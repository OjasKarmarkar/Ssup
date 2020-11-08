import axios from 'axios';
import history from '../../history';
axios.defaults.withCredentials = true;

export const signIn = (id, pwd) => async (dispatch) => {
  const response = await axios.post("https://ssup-server.herokuapp.com/api/login", {
    email: id,
    password: pwd,
  });
  
  dispatch({
    type: "SIGN_IN",
    payload: response.headers,
  });
  history.push('/dashboard')
};

export const sendMessage = (data) => async (dispatch) => {
  var socket = data[0]
  socket.emit('message' , data[1])	
};

export const fetchChats = () => async (dispatch) => {
  
  const response = await axios.get("https://ssup-server.herokuapp.com/api/dashboard");
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

export const selectChat = (props) => async (dispatch)=>{
  // const response = await axios.post("https://ssup-server.herokuapp.com/api/fetchSingle",{
  //  id:props._id
  // });
  dispatch({
    type: "SELECT_CHAT",
    payload: props,
  });
};

export const updateMessage = (props)=> (dispatch)=>{
  dispatch({
    type: "MESSAGE",
    payload: props,
  });
};

export const register = (props) => async (dispatch) => {
  const response = await axios.post("https://ssup-server.herokuapp.com/api/register",{
    email: props.email,
    name:props.name,
    password: props.password,
  });
  dispatch({
    type: "REGISTER",
    payload: response.headers,
  });
};
