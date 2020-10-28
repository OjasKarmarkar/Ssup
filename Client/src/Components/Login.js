import React from "react";
import { connect } from "react-redux";
import bg from "../Images/bg.jpg";
import { signIn, signOut } from "../Store/Actions/index";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};

const renderInput = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <input
        {...input}
        className="bg-gray-200 appearance-none border-2 border-indigo-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        type={type}
        placeholder={placeholder}
      />
      {touched && error && <span className="mt-10 text-red-500">{error}</span>}
    </div>
  );
};

class Login extends React.Component {
  onSubmit = (formProps) => {
    this.props.signIn(formProps.email, formProps.password);
  };

  render() {
    return (
      <div className="bg-gray-200 h-screen">
        <div className="flex mb-4">
          <div className="w-1/2 h-screen p-2 bg-gray-100 text-left">
            <p className="mt-10 ml-8 text-3xl font-semibold text-indigo-600">
              Ssup.
            </p>
            <p className="my-16 ml-8 text-2xl font-semibold">
                  The Open Source Chat App , <br></br>
                  With End-to-End Encryption!
                </p>
            <form
              className="w-full max-w-sm mt-20"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Field name="email" type="text" component={renderInput} />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-5"
                    htmlFor="inline-password"
                  >
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Field
                    name="password"
                    type="password"
                    placeholder="******************"
                    component={renderInput}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="md:flex md:items-center m-10">
                  <div className="w-1/2">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-1/2">
                    <Link to="/register">
                      <button
                        className="bg-transparent hover:bg-indigo-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        type="button"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            className="w-1/2 h-screen p-2 bg-white items-center"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 700,
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const loginForm = reduxForm({
  // a unique name for the form
  form: "login",
  validate: validate,
})(Login);

export default connect(null, {
  signIn,
  signOut,
})(loginForm);
