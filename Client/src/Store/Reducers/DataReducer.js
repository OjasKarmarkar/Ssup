const INITIAL_STATE = {
  data: null,
  user: null,
  selectedChat: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DATA":
      return { ...state, data: action.payload.data, user: action.payload.user };
    case "SELECT_CHAT":
      return { ...state, selectedChat: action.payload };
    case "MESSAGE":
      var tempArr = state.data
      var chatToUpdate = tempArr.filter((element)=> element._id === action.payload[0])
      chatToUpdate[0].messages.push(action.payload[1])
      // var temp = state.selectedChat;
      // temp.messages.push(action.payload[1]);
      //return { ...state, selectedChat: temp };
    default:
      return state;
  }
};
