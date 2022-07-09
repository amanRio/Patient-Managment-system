import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { BASE_URL } from "../api/axios";
import { useState, useEffect } from "react";

import { Form, Button, Container } from "react-bootstrap";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import HorizontalNavbar from "../components/HorizontalNavbar";
import useAuth from "../hooks/useAuth";

export default function BRegister() {
  const [reason, setReason] = useState("");
  const [hospitalId, setHosId] = useState("");
  const [amount, setAmount] = useState("");
  const [Hospital, setHospital] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const {auth} = useAuth();

  // display list of hospitals in dropdown list when the load 
  useEffect(() => {
    axios.get(`${BASE_URL}/hospital`).then((response) => {
      setHospital(response.data);
    });
  }, []);

  // register bill 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = localStorage?.pid;
    try {
      console.log(reason, patientId, hospitalId, amount);
      const response = await axios.post(`${BASE_URL}/registerbill`, {
        reason,
        patientId,
        hospitalId,
        amount,
      });
      // navigate after adding bill 
      {auth?.roles==3?
      navigate("/PDtl"):
      navigate("/PDetail")
      }
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
            <Form.Label>Reason </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              placeholder="Enter Reason"
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasic">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
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
              {/* Get dropdown list */}
              {Hospital.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
