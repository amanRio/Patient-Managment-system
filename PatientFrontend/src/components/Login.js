import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { BASE_URL } from "../api/axios";
import { Container } from "react-bootstrap";

const Login = () => {
  // set initial state of hooks
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // focus ino the first field when the project load
  useEffect(() => {
    userRef.current.focus();
  }, []);

//update the error message when a change in email and password
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);


// login request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      //set data on client computer
      localStorage.setItem("accessToken", response?.data?.token);
      localStorage.setItem("roles", response?.data?.user?.role);
      localStorage.setItem("loginid", response?.data?.user?.id);
      localStorage.setItem("username", response?.data?.user?.name);
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.token;
      console.log(JSON.stringify(accessToken));
      const roles = response?.data?.user?.role;
      const username = response?.data?.user?.name;

      // set Auth state
      setAuth({ email, password, username, roles, accessToken });
    
      setEmail("");
      setPassword("");
      // navigate by the role
      {
        roles == 1
          ? navigate("/hlist")
          : roles == 2
          ? navigate("/plist")
          : roles == 3
          ? navigate("/plst")
          : navigate("/Insurance")
          
      }

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  //stay login
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <Container
      style={{
        width: "30%",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "1%",
        alignSelf: "center",
        marginTop: "6%",
      }}
    >
      <div>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            style={{
              marginTop: "10px",
              width: "25%",
              alignSelf: "center",
              borderRadius: "30px",
            }}
          >
            Sign In
          </button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
