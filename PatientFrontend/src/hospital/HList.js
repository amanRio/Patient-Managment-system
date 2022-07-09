import { Button, Container, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


import Header from "../components/Header";
import HorizontalNavbar from "../components/HorizontalNavbar";

export default function HList() {
  const [Hospital, setHospital] = useState([]);
  

  useEffect(() => {
    axios.get(`${BASE_URL}/hospital`).then((response) => {
      setHospital(response.data);
    });
  }, []);

 const  setID=(id,name,adress, phone)=>{
  localStorage.setItem("hname", name);
  localStorage.setItem("haddress", adress);
  localStorage.setItem("hphone", phone);
  localStorage.setItem("hid", id);
}
 //delet request
async function del(id){    
  const response = await axios.get(`${BASE_URL}/hospitaldelete/${id}` );
  window.location.reload();
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
        <Link style={{ color: "black" }} to="/HRegister">
          Add Hospital
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Hospital</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {Hospital.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.adress}</td>
                  <td>{data.Phone}</td>
                  <td>
                    <Link to={"/Hedit"}>
                      <Button
                        onClick={() => {
                         
                          setID(data.id,data.name,data.adress,data.Phone);
                         
                        }}
                        className="bg-secondary btn-sm "
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button className="bg-danger btn-sm "
                     onClick={()=>{
                      del(data.id)
                     }}
                    >Delet</Button>
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
