import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { BASE_URL } from "../api/axios";
import { useState } from "react";

import { Form, Button, Container } from "react-bootstrap";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import HorizontalNavbar from "../components/HorizontalNavbar";

export default function HRegister() {
  const [name, setName] = useState("");
  const [adress, setAddres] = useState("");
  const [Phone, setPhone] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/shospital`, {
        name,
        adress,
        Phone,
      });
      setErrMsg("Successfuly Registerd");
        navigate("/hlist");
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
            <Form.Label>Name </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasic">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={adress}
              onChange={(e) => setAddres(e.target.value)}
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              required="true"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
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
