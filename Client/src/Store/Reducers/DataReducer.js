const INITIAL_STATE = {
    data:null,
    user:null
  };
  
  export default (state = INITIAL_STATE , action) => {
  switch(action.type){
      case 'DATA':
       return {...state , data:action.payload.data , user:action.payload.user};
     default:
         return state;
  }
  };