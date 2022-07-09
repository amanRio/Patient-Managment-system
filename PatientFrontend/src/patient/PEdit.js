import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";

import Header from "../components/Header";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HorizontalNavbar from "../components/HorizontalNavbar";

export default function PEdit() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [pecelNo, setPecelNo] = useState("");
  const navigate = useNavigate();
  const recordedby = localStorage?.loginid;
  useEffect(() => {
    setId(localStorage?.pid);
    setAddress(localStorage?.paddress);
    setPhone(localStorage?.pphone);
    setlastName(localStorage?.plastname);
    setEmail(localStorage?.pemail);
    setPecelNo(localStorage?.ppecelNo);
    setName(localStorage?.pname);
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   console.log(name, hospitalId, email, role, password);
      const response = await axios.post(`${BASE_URL}/updatepatient/${id}`, {
        name,
        lastName,
        address,
        phone,
        email,
        pecelNo,
        recordedby,
      });
      setErrMsg("Successfuly Registerd");
      navigate("/plist");
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
          <Form.Group className="mb-1" controlId="formBasicText">
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
              placeholder="Enter last Name"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicPhone">
            <Form.Label>Phone </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Enter Phone"
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicemail">
            <Form.Label> Email </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicaddress">
            <Form.Label>Address </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Enter Address"
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPeacelNo">
            <Form.Label>Pecel Number</Form.Label>
            <Form.Control
              type="number"
              required="true"
              value={pecelNo}
              onChange={(e) => setPecelNo(e.target.value)}
              placeholder="Pecel Number"
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit} type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
}
