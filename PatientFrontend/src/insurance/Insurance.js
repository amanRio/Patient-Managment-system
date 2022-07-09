import Header from "../components/Header";
import HorizontalNavbar from "../components/HorizontalNavbar";
import { Button, Col, Row, Container, Table , Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";
import { MDBCol, MDBFormInline, MDBBtn, MDBIcon } from "mdbreact";



export default function Insurance() {
    const [Hospital, setHospital] = useState([]);
    const [hospitalId, setHosId] = useState("");
    const [id, setId] = useState("");
    const [status, setStatus] = useState(0);
    const [errMsg, setErrMsg] = useState("");
    const [bill, setBill] = useState([]);
    const [temp, setTemp] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/hospital`).then((response) => {
          setHospital(response.data);
        });
      }, []);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
      
        try {
          
          const response = await axios.get(`${BASE_URL}/billsearch/${hospitalId}/${id}` );
          setBill(response.data)
        
        } catch (err) {
          if (err?.response) {
            setErrMsg("Registration Failed");
          }      
        }
    }



  return (
    <>
      <HorizontalNavbar />
      <Header />
      <Container style={{ width: "60%" }} className="my-auto Width-25%">
        <Row className="item">
         
          <Col className="info">
            <br />
       
            <Form>
          <Form.Group className="mb-1" controlId="formBasicText">
            
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => setId(e.target.value)}
              value={id}
              placeholder="PatientID"
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
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </Form>
           
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reason</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bill.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.reason} </td>
                      <td>{data.amount}</td>

                      {data?.insured == 1 ? (
                        <td>
                            Insured    
                        </td>
                      ) : (
                        <td>
                            Not Insured   
                        </td>
                      )}
                     
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
