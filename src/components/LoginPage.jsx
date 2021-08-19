import React, {  useState } from "react";
import Axios from "axios";
import { domain,header2 } from "../env";

const LoginPage = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  //Nó sẽ liên quan đến urls.py

  console.log(username);
  console.log(password);
  const loginRequest = async () => {
    await Axios({
      method: "post",
      url: `${domain}/api/login/`,
      headers:header2,
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data['token']);
        window.localStorage.setItem("token",response.data['token']);
      })
      .catch((_) => {
        alert("Your name or Password is Wrong!! Try again...");
      });
  };
  return (
    <div className="container mt-4">
      <h1>Login Page</h1>
      <div className="form-group">
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          placeholder="UserName"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button onClick={loginRequest} className="btn btn-success my-2">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
