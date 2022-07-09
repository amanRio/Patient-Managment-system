import { Button, Container, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


import Header from "../components/Header";
import HorizontalNavbar from "../components/HorizontalNavbar";

export default function UList() {
  const [User, setUser] = useState([]);
  

  useEffect(() => {
    axios.get(`${BASE_URL}/user`).then((response) => {
        setUser(response.data);
    });
  }, []);

 const  setID=(id,name,adress, phone)=>{
  localStorage.setItem("hname", name);
  localStorage.setItem("haddress", adress);
  localStorage.setItem("hphone", phone);
  localStorage.setItem("hid", id);
}
  const rl= (id)=>{
     if(id==1){
        return "System admin"
     }
     else if (id==2){
        return "Hospital reception"
     }
     else if(id==3){
        return "Medical Department"
     }
     else{
        return "Insurance Company"
     }
  }
  return (
    <>
      <HorizontalNavbar />
      <Header />
      <Container
        className="ml-10"
        style={{ width: "68%", padding: "5% " }}
        className="my-auto Width-25%"
      >
        <Link style={{ color: "black" }} to="/URegister">
          Add New User
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              
            </tr>
          </thead>
          <tbody>
            {User.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name} {data.lastname}</td>
                  <td>{data.email}</td>
                  <td>{rl(data.role)}</td>
                  
                 
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
