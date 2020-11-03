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
      var temp = state.selectedChat;
      temp.messages.push(action.payload);
      return { ...state, selectedChat: temp };
    default:
      return state;
  }
};
