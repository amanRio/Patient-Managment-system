import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";

import Header from "../components/Header";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HorizontalNavbar from "../components/HorizontalNavbar";

export default function URegister() {
  const [name, setName] = useState("");
  const [hospitalId, setHosId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [Hospital, setHospital] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/hospital`).then((response) => {
      setHospital(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(name, hospitalId, email, role, password);
      const response = await axios.post(`${BASE_URL}/registeruser`, {
        name,
        hospitalId,
        email,
        role,
        password,
      }
      );
      setErrMsg("Successfuly Registerd");
      navigate("/ulist");
    } catch (err) {
      if (err?.response) {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      <HorizontalNavbar />
      <Header />
      <Container style={{ width: "50%" }} className="my-auto Width-25%">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <Form>
          <Form.Group className="mb-1" controlId="formBasicText">
            <Form.Label> Name </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasic">
            <Form.Select
              onChange={(e) => {
                const se = e.target.value;
                setRole(se);
              }}
              aria-label="Default select example"
            >
              <option selected="true" disabled="disabled">
                Roles
              </option>
              <option value="1">System Admin</option>
              <option value="2">Hospital reception</option>
              <option value="3">Medical Department</option>
              <option value="4">Insurance Company</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasic">
            <Form.Label> Email </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasic">
            <Form.Select
              onChange={(e) => {
                const se = e.target.value;
                setHosId(se);
              }}
              aria-label="Default select example"
            >
              <option selected="true" disabled="disabled">
                Hospital
              </option>
              {Hospital.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                   
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
