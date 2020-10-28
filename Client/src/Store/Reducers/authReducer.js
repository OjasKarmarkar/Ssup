const INITIAL_STATE = {
  isSignedIn: null,
  jwt:null
};

export default (state = INITIAL_STATE , action) => {
switch(action.type){
    case 'SIGN_IN':
     return {...state , isSignedIn: true , jwt:action.payload};
    case 'SIGN_OUT':
     return {...state , isSignedIn: false};
   default:
       return state;
}
};