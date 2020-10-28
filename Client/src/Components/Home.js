import React from "react";
import { connect } from "react-redux";
import { fetchChats } from "../Store/Actions/index";

const mapStateToProps = (state) => {
  console.log(state)
  return {
    chats: state.dashboard.data,
    user:state.dashboard.user
  }
};

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchChats();
  }

  render() {
    const user = this.props.user
    return (
      <div className="bg-white h-screen">
        <div className="flex mb-4">
          <div className="w-1/4 h-screen p-2 bg-white text-left">
            <p className="mt-2 ml-8 text-3xl font-semibold text-indigo-600">
              Ssup.
            </p>
            <div className="max-w-xs rounded-2xl overflow-hidden shadow m-8 p-5  bg-gray-200 text-center flex-col">
              <div className="rounded-full h-20 w-20 flex items-center justify-center bg-blue-200 m-auto text-3xl">
                O
              </div>
              {/* <img
                className="w-full"
                src="/img/card-top.jpg"
                alt="Sunset in the mountains"
              /> */}
              <div>
                <div className="font-bold text-xl mb-2 flex items-center justify-center">
                  {
                    user==null?"Ojas K.":
                    user.name
                  }
                  <svg
                    className="h-6 w-6 m-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-base">
                  Never Settle.
                </p>
              </div>
            </div>
            <div className="flex items-center pl-4">
              <div className="text-sm p-4">
                <p className="text-gray-900 leading-none text-3xl font-semibold">Conversations</p>
              </div>
            </div>
            <div className="flex items-center pl-8">
              <div className="rounded-full h-10 w-10 bg-blue-200 text-3xl text-center flex justify-center mb-1">
                J
              </div>
              {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
              <div className="text-sm p-4">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
            <div className="flex items-center pl-8">
              <div className="rounded-full h-10 w-10 bg-blue-200 text-3xl text-center flex justify-center mb-1">
                J
              </div>
              {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
              <div className="text-sm p-4">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
            <div className="flex items-center pl-8">
              <div className="rounded-full h-10 w-10 bg-blue-200 text-3xl text-center flex justify-center mb-1">
                J
              </div>
              {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
              <div className="text-sm p-4">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
            <div className="flex items-center pl-8">
              <div className="rounded-full h-10 w-10 bg-blue-200 text-3xl text-center flex justify-center mb-1">
                J
              </div>
              {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
              <div className="text-sm p-4">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          </div>
          <div className="w-3/4 h-screen p-2 bg-white">
          <div className="max-w-full h-screen rounded-2xl overflow-hidden shadow m-8 p-5  bg-gray-200 text-center flex-col">
          
          <input
        className="bg-white appearance-none border-2 border-indigo-400 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        type="text"
        placeholder="Type Here"
      />
     <div className="bottom-0">Hello</div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  fetchChats,
})(Home);
