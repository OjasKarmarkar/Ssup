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
      var tempArr = [...state.data];
      var chatToUpdate = tempArr.filter(
        (element) => element._id === action.payload[0]
      );
      var i = tempArr.findIndex((element) => element._id === action.payload[0]);
      chatToUpdate[0].messages = chatToUpdate[0].messages.concat(
        action.payload[1]
      );
      tempArr.splice(i, 1, chatToUpdate[0]);
      if (chatToUpdate[0]._id === state.selectedChat._id) {
        return { ...state, data: tempArr, selectedChat: chatToUpdate[0] };
      } else {
        return { ...state, data: tempArr };
      }

    // var temp = state.selectedChat;
    // temp.messages.push(action.payload[1]);
    //return { ...state, selectedChat: temp };
    default:
      return state;
  }
};
