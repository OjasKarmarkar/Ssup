import React from "react";
import { connect } from "react-redux";
import { fetchChats, sendMessage, updateMessage } from "../Store/Actions/index";
import MyChats from "./allChats";
import CryptoJS from "crypto-js";
import io from "socket.io-client";
import bg from "../Images/chat.png";
import water from "../Sound/water.wav";
const { REACT_APP_MY_ENV } = process.env;

const notiAudio = new Audio(water);
var socket;

const mapStateToProps = (state) => {
  return {
    selectedChat: state.dashboard.selectedChat,
    user: state.dashboard.user,
    data: state.dashboard.data,
  };
};


class Home extends React.Component {

  componentDidMount() {
    this.props.fetchChats();
  }

  scrollToBottom = () => {
    //messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState();
    this.scrollToBottom();
  }

  constructor(props) {
    super(props);
    socket = io.connect("http://localhost:5000");
    socket.on("New", (res) => {
      this.props.updateMessage(res);
      notiAudio.play()
    });
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  onSubmit = (event) => {
    var ciphertext = CryptoJS.AES.encrypt(
      this.state.value,
      REACT_APP_MY_ENV
    ).toString();
    this.props.sendMessage([
      socket,
      {
        sender: this.props.user._id,
        message: ciphertext,
        room: this.props.selectedChat._id,
      },
    ]);
    this.setState({
      value: "",
    });
    event.preventDefault();
  };

  renderChats() {
    const messages = this.props.selectedChat.messages;
    const listItems = messages.map((d) => {
      var bytes = CryptoJS.AES.decrypt(d.message, REACT_APP_MY_ENV);
      var msg = bytes.toString(CryptoJS.enc.Utf8);
      //console.log(msg)
      if (d.sender === this.props.user._id) {
        return (
          <div key={d.message} className="text-right p-2">
            <p className="bg-indigo-400 p-2 rounded-3xl">{msg}</p>
          </div>
        );
      } else {
        return (
          <div className="text-left p-2" key={d.message}>
            <p className="bg-indigo-400 p-2 rounded-3xl">{msg}</p>
          </div>
        );
      }
    });
    return (
      <div>
        {listItems}
      </div>
    );
  }

  render() {
    return (
      <div className="bg-white h-screen">
        <div className="flex mb-4">
          <div className="w-1/4 h-screen p-2 bg-white text-left">
            <p className="mt-2 ml-8 text-3xl font-semibold text-indigo-600">
              Ssup.
            </p>
            <MyChats socket={socket} />
          </div>
          <div className="w-3/4 h-screen p-2 bg-white">
            <div className="max-w-full h-screen rounded-2xl overflow-hidden shadow m-8 p-5  bg-gray-200 text-center flex-col overflow-y-scroll">
              {this.props.selectedChat != null ? (
                <div>
                  {this.renderChats()}
                  <div className="absolute bottom-0 right-30 left-10 w-3/5 z-20">
                    <form onSubmit={this.onSubmit}>
                      <input
                        className="bg-white appearance-none border-2 border-indigo-400 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.value}
                        placeholder="Type Here"
                      />
                      <input type="submit" value="" />
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <img src={bg} alt="" className="p-2 "></img>
                  </div>
                  <div className="text-center justify-center p-15 text-semibold text-xl">
                    Select a Chat to start messaging
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  fetchChats,
  sendMessage,
  updateMessage,
})(Home);
