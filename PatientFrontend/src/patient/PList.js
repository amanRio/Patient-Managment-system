import { Button, Container, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


import Header from "../components/Header";
import HorizontalNavbar from "../components/HorizontalNavbar";

export default function PList() {
  const [User, setUser] = useState([]);
  const {auth} = useAuth();
  

  useEffect(() => {
    axios.get(`${BASE_URL}/patient`).then((response) => {
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
 
  return (
    <>
      <HorizontalNavbar />
      <Header />
      <Container
        className="ml-10"
        style={{ width: "68%", padding: "3% " }}
        className="my-auto Width-25%"
      >
       {localStorage?.roles==2? <Link style={{ color: "black" }} to="/PRegister">
          Add New Patient
        </Link>:<></>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
             
              <th>Address</th>
              <th>Phone</th>  
              <th>Email</th>    
              <th>PECEl Number</th>            
            </tr>
          </thead>
          <tbody>
            {User.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name} {data.lastName}</td>
                  <td>{data.address}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>{data.pecelNo}</td>
                  {localStorage?.roles==2?
                  (<td>
                    <Link to={"/PEdit"}>
                      <Button
                        onClick={() => {
                         
                          setID(data.id,data.name,data.lastName,data.email,data.address,data.phone,data.pecelNo);
                         
                        }}
                        className="bg-secondary btn-sm "
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>):""
                  }     
                  <td>
                 { auth?.roles == 2? <Link to={"/PDetail"}>
                    <Button
                    onClick={() => {
                         
                      setID(data.id,data.name,data.lastName,data.email,data.address,data.phone,data.pecelNo);
                     
                    }}
                    className="bg-secondary btn-sm "
                     className="bg-danger btn-sm ">Detail</Button>
                    </Link>:
                    <Link to={"/PDtl"}>
                    <Button
                    onClick={() => {
                         
                      setID(data.id,data.name,data.lastName,data.email,data.address,data.phone,data.pecelNo);
                     
                    }}
                    className="bg-secondary btn-sm "
                     className="bg-danger btn-sm ">Detail</Button>
                    </Link>
                    
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
