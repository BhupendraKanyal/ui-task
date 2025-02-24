import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMessage] = useState("")
  const [isError, setIsError] = useState(true)
  const handleRegistration = async () => {
    try {
      const res = await axios.post("http://localhost:9999/register", { email, password });
      setIsError(false)
      setMessage(res.data.message);
    } catch(err) {
      setIsError(true)
      setMessage(err.response.data.message);
    }
  };
  const handleLogin = async()=>{
    try {
      const res = await axios.post("http://localhost:9999/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsError(false)
      setMessage(res.data.message);
    } catch(err) {
      setIsError(true)
      setMessage(err.response.data.message);
    }
  }
  const handleOrder =  async()=>{
    try {
      let token  = localStorage.getItem("token");
      const res = await axios.post("http://localhost:9999/order", { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setIsError(false)
      setMessage(res.data.message);
    } catch(err) {
      setIsError(true)
      setMessage(err.response.data.message);
    }
  }

  return (
    <div>
  <div style={{ marginBottom: "10px" }}>
    <label>Email:</label><br />
    <input type="email" onChange={(e) => setEmail(e.target.value)} />
  </div>
  
  <div style={{ marginBottom: "10px" }}>
    <label>Password:</label><br />
    <input type="password" onChange={(e) => setPassword(e.target.value)} />
  </div>

  <div>
    <button onClick={handleRegistration} style={{ marginRight: "5px" }}>Register</button>
    <button onClick={handleLogin} style={{ marginRight: "5px" }}>Log In</button>
    <button onClick={handleOrder}>Order</button>
  </div>

  <p style={{color: isError ? 'red' : 'green'}}>{msg}</p>
</div>
  );
};

export default Login;
