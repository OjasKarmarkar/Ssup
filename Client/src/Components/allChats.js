import React from "react";
import { connect } from "react-redux";
import { selectChat } from "../Store/Actions/index";
import axios from "axios";
import history from "../history";
axios.defaults.withCredentials = true;

const mapStateToProps = (state) => {
  return {
    chats: state.dashboard.data,
    user: state.dashboard.user,
  };
};
class MyChats extends React.Component {

  selectChat = (props) => {
    this.props.selectChat(props);
  };
  state = { modalName: "hidden", users: [] };

  UNSAFE_componentWillReceiveProps() {
    this.setState();
  }

  fetchUsers = async () => {
    const response = await axios.get("https://ssup-server.herokuapp.com/api/users");
    this.setState({ users: response.data.users });
  };

  newChat = async (props) => {
    var e1 = props[0];
    var e2 = props[1];
    var chats = this.props.chats
    chats.forEach(async(chat , i)=>{
      var participants = chat.participants
      if(participants.includes(e1) && participants.includes(e2)){
        history.push("/dashboard");
      }else{
        const response = await axios.post("https://ssup-server.herokuapp.com/api/newChat", {
          participants: props,
        });
        if (response.status === 200) {
          this.setState({ modalName: "" });
          history.push("/dashboard");
        }
      }
    })
   
  };

  showModal = () => {
    this.setState({ modalName: "" });
    this.fetchUsers();
  };

  renderUsers() {
    if (!this.state.users) {
      return <div className="p-8">Loading....</div>;
    }
    const listItems = this.state.users.map((d) => {
      var name = d;
      var temp = [this.props.user._id, d];
      name = name.replace(",", "");
      const pfp = name.charAt(0).toUpperCase();
      if (name === this.props.user._id) {
        return <div key={name}></div>;
      } else {
        return (
          <div
            className="flex items-center"
            key={name}
            onClick={() => this.newChat(temp)}
          >
            <div className="rounded-full h-10 w-10 bg-blue-200 text-3xl text-center">
              {pfp}
            </div>
            {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
            <div className="text-sm p-4">
              <p className="text-gray-900 leading-none font-semibold">{name}</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
        );
      }
    });
    return <div>{listItems}</div>;
  }

  Modal() {
    return (
      <div className={this.state.modalName}>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Select To Chat
                    </h3>
                    <div className="mt-2">{this.renderUsers()}</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => {
                      this.setState({ modalName: "hidden" });
                    }}
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  ChatList() {
    const chats = this.props.chats;
    const user = this.props.user;

    if (!chats && !user) {
      return <div>Loading...</div>;
    } else if (chats == null && user != null) {
      return (
        <div className="p-10">Click The Add Button To Start Chatting!</div>
      );
    } else {
      const listItems = chats.map((d) => {
        var name = String(d.participants).replace(user._id, "");
        name = name.replace(",", "");
        const pfp = name.charAt(0).toUpperCase();
        this.props.socket.emit("subscribe", d._id);
        return (
          <div
            className="flex items-center pl-8"
            key={name}
            onClick={() => this.selectChat(d)}
          >
            <div className="rounded-full h-10 w-10 bg-blue-200 text-3xl text-center">
              {pfp}
            </div>
            {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
            <div className="text-sm p-4">
              <p className="text-gray-900 leading-none font-semibold">{name}</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
        );
      });
      return <div>{listItems}</div>;
    }
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        {this.Modal()}
        <div className="max-w-xs rounded-2xl overflow-hidden shadow m-8 p-5  bg-gray-200 text-center flex-col">
          <div className="rounded-full h-20 w-20 flex items-center justify-center bg-blue-200 m-auto text-3xl">
            O
          </div>
          <div>
            <div className="font-bold text-xl mb-2 flex items-center justify-center">
              {user == null ? "Ojas K." : user.name}
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
            <p className="text-gray-700 text-base">Never Settle.</p>
          </div>
        </div>
        <div className="flex items-center pl-4">
          <div className="text-sm p-4">
            <p className="text-gray-900 leading-none text-3xl font-semibold">
              Conversations
            </p>
          </div>
        </div>
        {this.ChatList()}
        <div className="absolute bottom-0 right-10" onClick={this.showModal}>
          <div className="rounded-full h-12 w-12 flex items-center bg-blue-200 justify-center text-2xl font-bold ">
            +
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  selectChat,
})(MyChats);
