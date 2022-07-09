import Header from '../components/Header'
import HorizontalNavbar from '../components/HorizontalNavbar'
import { Button, Col, Row, Container, Table,  } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";
import useAuth from '../hooks/useAuth';

export default function PDetail() {

    const [User, setUser] = useState([]);
    const {auth} = useAuth();

    const id = localStorage?.pid;
    useEffect(() => {
        axios.get(`${BASE_URL}/bill/${id}`).then((response) => {
            setUser(response.data);
        });
      }, []);

    const  setID=(id,name,lastName,email,address,phone,pecelNo)=>{
        localStorage.setItem("pname", name);
        localStorage.setItem("paddress", address);
        localStorage.setItem("pphone", phone);
        localStorage.setItem("plastname", lastName);
        localStorage.setItem("pemail", email);
        localStorage.setItem("ppecelNo", pecelNo);
        localStorage.setItem("pid", id);
      }

      async function pay(id){    
        const response = await axios.get(`${BASE_URL}/billstatus/${id}` );
        window.location.reload();
    }

  return (
    <>
    <HorizontalNavbar />
    <Header/>
    <Container style={{ width: "60%" }} className="my-auto Width-25%">
    <Row className="item">
      {/* <Col sm={2}>
        
      </Col> */}
      <Col className="info">
        <br />        
        <Row className="buttonRow">
          <Col>
          <p>Name: {localStorage?.pname} {localStorage?.plastname}</p>
            <p>Phone Number: {localStorage?.pphone}</p>
            
          </Col>
          <Col style={{ textAlign: "right" }}>
            <p>Pecel Number: {localStorage?.ppecelNo}</p>
            <p>Address: {localStorage?.paddress}</p>
            
          </Col>
        </Row>
        {auth?.roles==2?
        <Link style={{ color: "black" }} to="/BRg">
          Add Bill
        </Link>
        :
        <Link style={{ color: "black" }} to="/BRegister">
          Add Bill
        </Link>
         }
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Reason</th>
             
              <th>Amount</th>
            
                        
            </tr>
          </thead>
          <tbody>
            {User.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.reason} </td>
                  <td>{data.amount}</td>
                
                     
                  {auth?.roles==2? (data.insured==0?<td>
                    <Button 
                      onClick={() => {
                       pay(data.id)
                       
                      }}
                      className="bg-secondary btn-sm "
                    >
                      Pay
                    </Button>
                  </td>: <td>paid</td>
                  ):<></>}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>   
    </Container>
    </>
  )
}
